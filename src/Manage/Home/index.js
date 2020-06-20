import React, { Component } from 'react'
import { message, Spin, Popconfirm, Modal, Button } from 'antd';
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

                // <article id="ember224" className="nt-card nt-card--in-segment ember-view">
                //   <div className="nt-card__main display-flex flex-row">
                //     <div className="nt-card__left-rail">
                //       <a href="/in/nhan%2Dho%2D03b197195" data-ember-action data-ember-action-225={225}>
                //         <div id="ember226" className="flex-shrink-zero ivm-image-view-model ember-view">
                //           <div id="ember227" className="display-flex ivm-view-attr__img-wrapper ivm-view-attr__img-wrapper--use-img-tag ember-view">
                //             <div id="ember281" className="presence-entity presence-entity--size-4 ember-view">
                //               <img title="View Nhan Ho’s profile" src="https://media-exp1.licdn.com/dms/image/C5603AQEGGgWQSv4ZVQ/profile-displayphoto-shrink_100_100/0?e=1597881600&v=beta&t=MPfoYydvQI8o6rqXuZJHREWkaMYWYpBrR3XOY1pSm-g" loading="lazy" alt="View Nhan Ho’s profile" id="ember282" className="ivm-view-attr__img--centered EntityPhoto-circle-4 presence-entity__image EntityPhoto-circle-4 lazy-image ember-view" />
                //               <div id="ember283" className="presence-entity__indicator presence-entity__indicator--size-4 presence-indicator presence-indicator--is-reachable presence-indicator--size-4 ember-view">
                //                 <span className="visually-hidden">Status is reachable</span>
                //               </div>
                //             </div>
                //           </div>
                //         </div>
                //       </a>
                //     </div>
                //     <div className="nt-card__core-rail mt1">
                //       <a className="nt-card__headline nt-card__text--3-line nt-card__text--word-wrap t-14 t-black t-normal" href="/feed/update/urn%3Ali%3Aactivity%3A6672074788141445120" tabIndex={0} data-ember-action data-ember-action-229={229}>
                //         <span aria-hidden="true">
                //           Nhan Ho
                //         <strong>shared a post</strong>: Singaporean Fin-tech Company is looking for #Senior #DevOps/ #Linux_Engineer as below : #Requirements : - Experienced in coding Python or C++ language - Good English communication #Salary : around $2500 gross #Location : Dist. 1 - HCMC ------------------------------------------- Please contact me for further information : Skype : hovanthanhnhan.264@gmail.com Mail: nhan.ho@hr1vietnam.com
                //       </span>
                //         <span className="visually-hidden">Nhan Ho shared a post: Singaporean Fin-tech Company is looking for #Senior #DevOps/ #Linux_Engineer as below : #Requirements : - Experienced in coding Python or C++ language - Good English communication #Salary : around $2500 gross #Location : Dist. 1 - HCMC ------------------------------------------- Please contact me for further information : Skype : hovanthanhnhan.264@gmail.com Mail: nhan.ho@hr1vietnam.com</span>
                //       </a>
                //     </div>
                //     <div className="nt-card__right-rail display-flex text-align-right">
                //       <div id="ember245" className="ember-view">
                //         <div id="ember246" className="artdeco-dropdown artdeco-dropdown--placement-bottom artdeco-dropdown--justification-right ember-view">
                //           <button aria-expanded="false" aria-label="Notification options" id="ember247" className="nt-card-settings-dropdown__trigger artdeco-dropdown__trigger artdeco-dropdown__trigger--placement-bottom ember-view" type="button" tabIndex={0}>
                //             <li-icon aria-hidden="true" type="ellipsis-horizontal-icon" className="nt-card-settings-dropdown__trigger-icon" size="large">
                //               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width={24} height={24} focusable="false">
                //                 <path d="M2 10h4v4H2v-4zm8 4h4v-4h-4v4zm8-4v4h4v-4h-4z" />
                //               </svg>
                //             </li-icon>
                //           </button>
                //           <div tabIndex={-1} aria-hidden="true" id="ember248" className="nt-card-settings-dropdown__content artdeco-dropdown__content artdeco-dropdown--is-dropdown-element artdeco-dropdown__content--has-arrow artdeco-dropdown__content--arrow-right artdeco-dropdown__content--justification-right artdeco-dropdown__content--placement-bottom ember-view">
                //             <div className="artdeco-dropdown__content-inner">
                //               <div id="ember250" className="nt-card-settings-dropdown__item artdeco-dropdown__item artdeco-dropdown__item--is-dropdown ember-view">
                //                 <button className="display-flex align-items-center text-align-left full-width" type="button">
                //                   <li-icon aria-hidden="true" type="trash-icon" className="nt-card-settings-dropdown__icon mr2 display-flex" size="medium">
                //                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width={24} height={24} focusable="false">
                //                       <path d="M19.26 2.9A28 28 0 0015 2.13V1.5a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5v.63a28 28 0 00-4.26.78 1 1 0 00-.74 1V9h1v12a1 1 0 001 1h12a1 1 0 001-1V9h1V3.88a1 1 0 00-.74-.98zM17 20H7V9h10v11zm1-13H6V4.59a26.35 26.35 0 016-.71 26.35 26.35 0 016 .71V7zm-7 11h-1v-7h1v7zm3 0h-1v-7h1v7z" />
                //                     </svg>
                //                   </li-icon>
                //                   <div>
                //                     <p className="t-14 t-black t-bold">
                //                       Delete
                //                   </p>
                //                     <p className="t-12 t-black--light t-normal">
                //                       Delete this notification
                //                   </p>
                //                   </div>
                //                 </button>
                //               </div>
                //               <div id="ember252" className="nt-card-settings-dropdown__item artdeco-dropdown__item artdeco-dropdown__item--is-dropdown ember-view">
                //                 <button className="display-flex align-items-center text-align-left full-width" type="button">
                //                   <li-icon aria-hidden="true" type="block-icon" className="nt-card-settings-dropdown__icon mr2 display-flex" size="medium">
                //                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width={24} height={24} focusable="false">
                //                       <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM3.9 12c0-4.5 3.6-8.1 8.1-8.1 1.9 0 3.7.7 5 1.8L5.6 17c-1.1-1.3-1.7-3.1-1.7-5zm8.1 8.1c-1.9 0-3.7-.7-5-1.8L18.4 7c1.1 1.4 1.8 3.1 1.8 5-.1 4.5-3.7 8.1-8.2 8.1z" />
                //                     </svg>
                //                   </li-icon>
                //                   <div>
                //                     <p className="t-14 t-black t-bold">
                //                       Unfollow
                //                   </p>
                //                     <p className="t-12 t-black--light t-normal">
                //                       Stop seeing Nhan’s updates
                //                   </p>
                //                   </div>
                //                 </button>
                //               </div>
                //               <div id="ember254" className="nt-card-settings-dropdown__item artdeco-dropdown__item artdeco-dropdown__item--is-dropdown ember-view">
                //                 <button className="display-flex align-items-center text-align-left full-width" type="button">
                //                   <li-icon aria-hidden="true" type="error-pebble-icon" className="nt-card-settings-dropdown__icon mr2 display-flex" size="medium">
                //                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width={24} height={24} focusable="false">
                //                       <circle className="circle" r="9.1" stroke="currentColor" strokeWidth="1.8" cx={12} cy={12} fill="none" transform="rotate(-90 12 12)" />
                //                       <path d="M13.238 12l3.463 3.463-1.238 1.237L12 13.237 8.538 16.7 7.3 15.463 10.763 12 7.3 8.537 8.538 7.3 12 10.763l3.452-3.452 1.238 1.237L13.238 12z" />
                //                     </svg>
                //                   </li-icon>
                //                   <div>
                //                     <p className="t-14 t-black t-bold">
                //                       Turn off
                //                   </p>
                //                     <p className="t-12 t-black--light t-normal">
                //                       Stop receiving notifications like this
                //                   </p>
                //                   </div>
                //                 </button>
                //               </div>
                //             </div>
                //           </div>
                //         </div>
                //       </div>

                //     </div>
                //   </div>
                // </article>

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
                      <iframe title={itemActive.file.name} src={itemActive.file.link + '?embedded=true'}></iframe>
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
