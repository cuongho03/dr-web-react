import React, { Component } from 'react'
import { message, Spin, Popconfirm, Modal, } from 'antd';
import { FirebaseRef } from '../../lib/firebase'
import serviceMail from '../../services/sendmail'
import './Notificaction.css';
import './Message.css';
import moment from 'moment'
import { DeleteOutlined, FolderViewOutlined } from '@ant-design/icons'
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      visible: false,
      action: false,
      status: 'pending',
      itemActive: {}
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    const { member } = this.props
    let ref = FirebaseRef.child(`/notifyDocter`)
    ref.on('value', snapshot => {
      const data = snapshot.val()

      if (data && typeof (data) === 'object') {
        let newData = []
        Object.keys(data).forEach(key => {
          if (data[key] && data[key].userShare === member.id) {
            newData.push({
              ...data[key],
              id: key,
            })
          }
        })
        const newArray = newData.reverse()

        this.setState({
          data: newArray
        })
      }
      this.setState({
        loading: false
      })
    })
  }

  handleCancel() {
    const { itemActive } = this.state
    const ref = FirebaseRef.child(`/notifyDocter/${itemActive.id}`)

    ref.set({
      ...itemActive,
      updated: moment().format(),
      status: 'active'
    })

    this.setState({
      visible: false
    })
  }



  handleShow() {
    this.setState({
      visible: true
    })
  }

  handleSendMail(Subject, Message, from, to) {
    const data = {
      from,
      to,
      subject: Subject,
      html: Message
    }
    serviceMail.sendMail(data).then(() => {
    })
  }

  remove(id) {
    const ref = FirebaseRef.child(`notifyDocter/${id}`)

    ref.remove().then(() => {
      message.success("Notify was removed!")

    }).catch(err => {
      message.error(err)
    })
  }

  handleSave = row => {

    const ref = FirebaseRef.child(`/docter/${row.id}`)
    ref.set({
      ...row
    })


  };

  setItemActive(item) {
    this.setState({
      itemActive: item,
      action: true
    })
  }

  render() {
    const { data, loading, itemActive, action } = this.state
    const newDataRecent = []
    const newDataOld = []

    data.forEach(item => {
      if (item.status === 'pending') {
        newDataRecent.push(item)
      } else {
        newDataOld.push(item)
      }
    })

    return (
      <div id="Notify" style={{ maxWidth: "1200px", margin: "auto" }} className="messageDr">
        {loading ? <div style={{ width: "100%", textAlign: "center" }}>
          <Spin />
        </div> : null}
        <div className="core-rail ">
          <div className="nt-banner ">
            <div data-control-name="nav_notif_banner" href="!#" id="ember67" className="nt-banner__link display-flex flex-row app-aware-link ember-view">
              <div className="nt-banner__one-liner">
                <h5 className="t-12 t-bold mb1 mr1">
                  <span aria-hidden="true">SPECIAL REPORT: CORONAVIRUS</span>
                  <span className="visually-hidden">SPECIAL REPORT: CORONAVIRUS</span>
                </h5>
                <p className="t-12 t-bold t-black--light mb1">
                  <span aria-hidden="true">by Gency healty News</span>
                  <span className="visually-hidden">by Gency healty News</span>
                </p>
              </div>
              {/* <li-icon aria-hidden="true" type="chevron-right-icon" className="nt-banner__icon align-self-center" size="small">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" width={16} height={16} focusable="false">
                  <path d="M9 8L5 2.07 6.54 1l4.2 6.15a1.5 1.5 0 010 1.69L6.54 15 5 13.93z" />
                </svg>
              </li-icon> */}
            </div >
          </div>
          <section className="nt-segment " aria-label="Recent">
            <header className="nt-segment-header">
              <h4 className="t-14 t-black--light t-bold">
                Recent
              </h4>
            </header>
            {
              newDataRecent.map(item => (
                <article key={item.id} className="nt-card nt-card--unread nt-card--in-segment ember-view">
                  <div className="nt-card__main display-flex flex-row">
                    <div className="nt-card__left-rail">
                      <div className="flex-shrink-zero ivm-image-view-model ember-view">
                        <div className="display-flex ivm-view-attr__img-wrapper ivm-view-attr__img-wrapper--use-img-tag ember-view">
                          <div className="presence-entity presence-entity--size-4 ember-view">
                            <div
                              className="viewAvatarItem viewAvatarItem-Second"
                              style={{ backgroundColor: item.color || 'black' }}
                            >
                              {item.patientName.toUpperCase().substring(0, 1)}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="nt-card__core-rail mt1">
                      <a className="nt-card__headline nt-card__text--3-line nt-card__text--word-wrap t-14 t-black t-normal" href="!#" onClick={(e) => { e.preventDefault(); }}>
                        <span aria-hidden="true">

                          <strong>{item.patientName}'s post</strong>: {item.description || ''}
                        </span>
                        <span className="visually-hidden"> {item.description || ''}</span>
                      </a>
                      <section id="ember111" className="nt-social-counts t-12 t-black--light t-normal mt2 ember-view">
                        <span className="nt-social-counts__count">{moment(item.created).fromNow()}</span>

                      </section>
                    </div>
                    <div className="nt-card__right-rail display-flex text-align-right">
                      <div onMouseOut={() => {
                        this.setState({
                          action: false
                        })
                      }} className="ember-view">
                        <div className="artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view">
                          <button onClick={() => { this.setItemActive(item) }} aria-expanded="false" aria-label="Notification options" id="ember114" className="nt-card-settings-dropdown__trigger artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view" type="button" tabIndex={0}>
                            <li-icon aria-hidden="true" type="ellipsis-horizontal-icon" className="nt-card-settings-dropdown__trigger-icon" size="large">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width={24} height={24} focusable="false">
                                <path d="M2 10h4v4H2v-4zm8 4h4v-4h-4v4zm8-4v4h4v-4h-4z" />
                              </svg>
                            </li-icon>
                          </button>
                          <div onMouseOver={() => { this.setItemActive(item) }} className={`nt-card-settings-dropdown__content artdeco-dropdown__content artdeco-dropdown--is-dropdown-element artdeco-dropdown__content--has-arrow artdeco-dropdown__content--arrow-right artdeco-dropdown__content--justification-right artdeco-dropdown__content--placement-bottom ember-view ${itemActive.id && item.id === itemActive.id && action ? "artdeco-dropdown__content--is-open" : ""}`}>
                            <div className="artdeco-dropdown__content-inner">
                              <div className="nt-card-settings-dropdown__item artdeco-dropdown__item artdeco-dropdown__item--is-dropdown ember-view">
                                <Popconfirm
                                  title="Are you sure delete this notify?"
                                  onConfirm={() => { this.remove(item.id) }}
                                  okText="Yes"
                                  cancelText="No">
                                  <button className="display-flex align-items-center text-align-left full-width" type="button">
                                    <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />
                                    <div>
                                      <p className="t-14 t-black t-bold">
                                        Delete
                              </p>
                                      <p className="t-12 t-black--light t-normal">
                                        Delete this notification
                              </p>
                                    </div>
                                  </button>
                                </Popconfirm>
                              </div>
                              {item.file && item.file.link ? (
                                <div className="nt-card-settings-dropdown__item artdeco-dropdown__item artdeco-dropdown__item--is-dropdown ember-view">
                                  <button onClick={() => {
                                    this.handleShow()
                                  }} className="display-flex align-items-center text-align-left full-width" type="button">
                                    <FolderViewOutlined style={{ fontSize: '20px' }} />
                                    <div>
                                      <p className="t-14 t-black t-bold">
                                        View File
                                    </p>

                                    </div>
                                  </button>
                                </div>
                              ) : null}


                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </article>

              ))
            }

          </section>
          <section className="nt-segment " aria-label="Earlier">
            <header className="nt-segment-header">
              <h4 className="t-14 t-black--light t-bold">
                Earlier
              </h4>
            </header>
            {
              newDataOld.map(item => (
                <article key={item.id} className="nt-card nt-card--in-segment ember-view">
                  <div className="nt-card__main display-flex flex-row">
                    <div className="nt-card__left-rail">
                      <div className="flex-shrink-zero ivm-image-view-model ember-view">
                        <div className="display-flex ivm-view-attr__img-wrapper ivm-view-attr__img-wrapper--use-img-tag ember-view">
                          <div className="presence-entity presence-entity--size-4 ember-view">
                            <div
                              className="viewAvatarItem viewAvatarItem-Second"
                              style={{ backgroundColor: item.color || 'black' }}
                            >
                              {item.patientName.toUpperCase().substring(0, 1)}
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="nt-card__core-rail mt1">
                      <a className="nt-card__headline nt-card__text--3-line nt-card__text--word-wrap t-14 t-black t-normal" href="!#" onClick={(e) => { e.preventDefault(); }}>
                        <span aria-hidden="true">

                          <strong>{item.patientName}'s post</strong>: {item.description || ''}
                        </span>
                        <span className="visually-hidden"> {item.description || ''}</span>
                      </a>
                      <section id="ember111" className="nt-social-counts t-12 t-black--light t-normal mt2 ember-view">
                        <span className="nt-social-counts__count">{moment(item.created).fromNow()}</span>

                      </section>
                    </div>
                    <div className="nt-card__right-rail display-flex text-align-right">
                      <div onMouseOut={() => {
                        this.setState({
                          action: false
                        })
                      }} className="ember-view">
                        <div className="artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view">
                          <button onClick={() => { this.setItemActive(item) }} aria-expanded="false" aria-label="Notification options" id="ember114" className="nt-card-settings-dropdown__trigger artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view" type="button" tabIndex={0}>
                            <li-icon aria-hidden="true" type="ellipsis-horizontal-icon" className="nt-card-settings-dropdown__trigger-icon" size="large">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width={24} height={24} focusable="false">
                                <path d="M2 10h4v4H2v-4zm8 4h4v-4h-4v4zm8-4v4h4v-4h-4z" />
                              </svg>
                            </li-icon>
                          </button>
                          <div onMouseOver={() => { this.setItemActive(item) }} className={`nt-card-settings-dropdown__content artdeco-dropdown__content artdeco-dropdown--is-dropdown-element artdeco-dropdown__content--has-arrow artdeco-dropdown__content--arrow-right artdeco-dropdown__content--justification-right artdeco-dropdown__content--placement-bottom ember-view ${itemActive.id && item.id === itemActive.id && action ? "artdeco-dropdown__content--is-open" : ""}`}>
                            <div className="artdeco-dropdown__content-inner">
                              <div className="nt-card-settings-dropdown__item artdeco-dropdown__item artdeco-dropdown__item--is-dropdown ember-view">
                                <Popconfirm
                                  title="Are you sure delete this notify?"
                                  onConfirm={() => { this.remove(item.id) }}
                                  okText="Yes"
                                  cancelText="No">
                                  <button className="display-flex align-items-center text-align-left full-width" type="button">
                                    <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} />
                                    <div>
                                      <p className="t-14 t-black t-bold">
                                        Delete
                            </p>
                                      <p className="t-12 t-black--light t-normal">
                                        Delete this notification
                            </p>
                                    </div>
                                  </button>
                                </Popconfirm>
                              </div>
                              {item.file && item.file.link ? (
                                <div className="nt-card-settings-dropdown__item artdeco-dropdown__item artdeco-dropdown__item--is-dropdown ember-view">
                                  <button onClick={() => {
                                    this.handleShow()
                                  }} className="display-flex align-items-center text-align-left full-width" type="button">
                                    <FolderViewOutlined style={{ fontSize: '20px' }} />
                                    <div>
                                      <p className="t-14 t-black t-bold">
                                        View File
                                  </p>

                                    </div>
                                  </button>
                                </div>
                              ) : null}


                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </article>


              ))
            }

          </section>
        </div>

        <Modal
          title={`View file`}
          visible={this.state.visible}
          onOk={() => { this.handleCancel() }}
          onCancel={() => { this.handleCancel() }}
        >
          {
            itemActive.file ? (
              <>
                {itemActive.file.type === 'image/png' || itemActive.file.type === 'image/jpeg' || itemActive.file.type === 'image/jpg' ? (
                  <>
                    <img height="100%" width="100%" src={itemActive.file.link} alt=""></img>
                  </>
                ) : null}
                {
                  itemActive.file.type === "application/pdf" ? (
                    <div>
                      <iframe height="500" width="100%" title={itemActive.file.name} src={`http://docs.google.com/gview?url=${itemActive.file.link}&embedded=true`}></iframe>
                    </div>
                  ) : null
                }

              </>
            ) : null
          }
        </Modal>
      </div>
    )
  }

}
export default Home;
