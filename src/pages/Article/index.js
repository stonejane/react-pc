import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { values } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
const { Option } = Select

const { RangePicker } = DatePicker

const Article = () => {
  const { channelStore } = useStore()
  const [articleList, setArticleList] = useState({
    list: [],  //文章列表
    count: 0  //文章总数 声明state中的list为对象方便统一管理
  })
  //参数变动会导致列表渲染改变
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    status: 0
  })

  useEffect(() => {
    async function loadList () {
      const res = await http.get('/mp/articles', { params })
      const { results, total_count } = res.data
      setArticleList({
        list: results,
        count: total_count
      })
    }
    loadList()
  }, [params]) //当异步请求函数需要依赖一些数据的变化而重新执行，推荐将其移入useEffect之内，这样就不会一直去初始化该请求函数而产生浪费，并在依赖项添加该依赖数据
  const onFinish = (value) => {
    console.log(value)
    //当筛选的参数改变时会导致重新渲染
    const { channel_id, date, status } = value
    const _params = {}
    if (status !== null) {
      _params.status = status
    }
    if (channel_id) {
      _params.channel_id = channel_id
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    setParams({ ...params, ..._params })
  }
  const pageChange = (page) => {
    setParams({
      ...params,
      page
    })
  }
  const delArticle = async (data) => {
    console.log(data)
    await http.delete(`/mp/articles/${data.id}`)
    setParams({
      ...params,
      page: 1
    })
  }

  const navigate = useNavigate()
  const goPublish = async (data) => {
    navigate(`/publish?id=${data.id}`)
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />}
              onClick={() => goPublish(data)} />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data)}
              okText="确认"
              cancelText="取消"
            ><Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              /></Popconfirm>

          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form
          onFinish={onFinish}
          initialValues={{ status: null }}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 150 }}
            >
              {channelStore.channelList.map(channel => <Option key={channel.id} value={channel.id}>{channel.name}</Option>)}

            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${articleList.count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={articleList.list} pagination={{ pageSize: params.per_page, current: params.page, total: articleList.count, onChange: pageChange }} />
      </Card>
    </div>
  )
}

export { Article }