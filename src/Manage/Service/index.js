/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react'
import "./index.scss"
import { uploadMutipleFile } from '../../actions/uploadFile'
import { Button, Form, Input, message, Upload, Select, Checkbox, InputNumber, Table, Tag, Popconfirm } from 'antd';
import { LoadingOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { FirebaseRef } from '../../lib/firebase'
import jwt from "jsonwebtoken"
import { EditableCell, EditableFormRow, } from './../../components/CustomerTable'

const { Option } = Select;

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  return true;
}

class Service extends Component {
  constructor(props) {
    super(props)
    const token = jwt.sign({
      id: localStorage.getItem("id"),

    },
      localStorage.getItem("id"),
      {
        algorithm: 'HS256',
        expiresIn: 24
      }
    );
    this.id = props.match.params.id
    let type = 0
    const origin = window.location.origin;
    let imageUrl = "/assets/img/docter.jpg"
    const parentId = localStorage.getItem("id")
    if (this.id === "service-1") {
      type = 1
      imageUrl = "/assets/img/docter1.jpg"
    } else if (this.id === "service-2") {
      type = 2
      imageUrl = "/assets/img/docter2.png"
    }
    console.log(token)
    this.state = {
      loading: true,
      loadData: true,
      data: {
        typeService: type,
        price: 0,
        typeCheck: 0,
        imageUrl,
        name: '',
        description: '',
        status: 'Unpublish'
      },
      item: {},
      link: origin + `/subscribe/${this.id}${parentId}/token/` + token,
      listData: []
    }
  }

  componentDidMount() {
    const parentId = localStorage.getItem("id")
    const ref = FirebaseRef.child(`Severice/${this.id}${parentId}`)

    ref.on('value', snapshot => {
      const data = snapshot.val() || []
      if (data) {
        console.log(data)
        this.setState({
          data
        })
      }
      this.setState({
        loadData: false
      })
    })

    const ref2 = FirebaseRef.child(`Data/${this.id}${parentId}`)

    ref2.on('value', snapshot => {
      const data = snapshot.val()
      if (data) {
        let newData = []
        Object.keys(data).forEach(key => {
          newData.push({
            ...data[key],
            id: key,
            type2: data[key].type
          })
        })
        const newArray = newData.reverse()

        this.setState({ listData: newArray })
      }

    })

  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done' || info.file.status === 'error') {
      uploadMutipleFile(info.file.originFileObj, `Service`).then(result => {
        const { url, isSuccess } = result
        if (isSuccess) {
          this.setState({
            data: {
              ...this.state.data,
              imageUrl: url,
            },
            loading: false,
          })
        }
      })

    }

  }

  confirm(id) {
    const parentId = localStorage.getItem("id")
    const ref = FirebaseRef.child(`Data/${this.id}${parentId}/${id}`)
    ref.remove().then(() => {


    }).catch(err => {
      message.error(err)
    })

  }

  onFinish = values => {
    const { data } = this.state
    const parentId = localStorage.getItem("id")
    const ref = FirebaseRef.child(`Severice/${this.id}${parentId}`)
    values.imageUrl = data.imageUrl
    ref.set({
      ...values
    }).then(() => {
      message.success("Edit your service successfully!")
    }).catch((err) => {
      message.error(err.message)
    })
  };

  copyToClipboard(text) {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0)
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  handleSave = row => {
    const parentId = localStorage.getItem("id")
    const ref = FirebaseRef.child(`/Data/${this.id}${parentId}/${row.id}`)

    ref.set({
      name: row.name,
      email: row.email,
      note: row.note
    })
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { data, loadData, link, listData } = this.state;

    const columns = [
      {
        title: 'Customer name',
        dataIndex: 'name',
        key: 'name',
        editable: true,
      },
      {
        title: 'Customer email',
        dataIndex: 'email',
        key: 'email',
        editable: true,
      },
      {
        editable: true,
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <span style={{ display: "flex", }}>

            {/* <Tag onClick={() => {
              console.log(record)
            }} color={"green"} key={"edit"}>
              Edit
             </Tag> */}

            <Popconfirm placement="top" title={"Are you sure delete this item ?"} onConfirm={() => { this.confirm(record.id) }} okText="yes" cancelText="no">

              <Tag color={"red"} key={"delete"}>
                Delete
             </Tag>
            </Popconfirm>

          </span>
        ),
      },
    ];

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const newColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: (record) => { this.handleSave(record) },
        }),
      };
    });


    return (
      <>
        <div className="row">
          <div className="col col-md-6">
            <h4>Service Detail</h4>
            {!loadData ? (
              <Form
                layout={"vertical"}
                onFinish={this.onFinish}
                initialValues={data}
              >
                <Form.Item name='imageUrl' label="Sevice's Image" >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {data.imageUrl ? <img src={data.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Service name"
                  name="name"
                  rules={[{ initialValue: data.name }]}
                >
                  <Input placeholder={"Your service's Name"} />
                </Form.Item>
                <Form.Item name='description' label="Description">
                  <Input.TextArea rows={4} placeholder={"Your service's Description"} />
                </Form.Item>
                <Form.Item name='status' label="Status">
                  <Select style={{ width: "100%" }}>
                    <Option value="Unpublish">Unpublish</Option>
                    <Option value="Publish">Publish</Option>
                  </Select>
                </Form.Item>
                <Form.Item name='typeService' label="Type">
                  <Select style={{ width: "100%" }} disabled>
                    <Option value={0}>Diagnose at the office</Option>
                    <Option value={1}>Diagnose videos realtime</Option>
                    <Option value={2}>Diagnose audio realtime</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Checkbox checked={!data.typeCheck} onClick={() => {
                    this.setState({
                      data: {
                        ...data,
                        typeCheck: 0
                      }
                    })
                  }}>Free</Checkbox>
                  <Checkbox checked={data.typeCheck > 0} onClick={() => {
                    this.setState({
                      data: {
                        ...data,
                        typeCheck: 1
                      }
                    })
                  }}>Pay</Checkbox>
                </Form.Item >

                {
                  data.typeCheck ? (
                    <Form.Item name='price' label="Price">
                      <InputNumber
                        style={{ width: "100%" }}

                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}

                      />
                    </Form.Item>
                  ) : null
                }
                <Button style={{ marginRight: '10px' }} shape="round" type="primary" htmlType="submit">
                  Save
                 </Button>
                <Button disabled={data.status !== 'Publish'} shape="round" onClick={() => {
                  const parentId = localStorage.getItem("id")
                  this.props.history.push(`/view/${this.id}${parentId}/service`)
                }} icon={<EyeOutlined />}  >
                  View
                 </Button>
              </Form>

            ) : null}

          </div>
          <div className="col col-md-6">
            <h4>Customer Subscribes</h4>
            <Table style={{ marginTop: '10px' }} rowClassName={() => 'editable-row'} bordered components={components} columns={newColumns} dataSource={listData} />
            <div style={{ marginTop: 16, cursor: 'copy' }}>
              <Input disabled addonAfter={<div onClick={() => {
                if (data.status === 'Publish') {
                  this.copyToClipboard(link);
                  message.success("Copy link succesfully!")
                } else {
                  message.warn("Copy link fail, your need to change status your service to publish and click button Save")
                }
              }}>Copy</div>}
                value={link} />
            </div>
          </div>

        </div>


      </>
    );
  }
}

export default Service;
