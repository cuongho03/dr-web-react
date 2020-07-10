/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component, } from 'react';
import './index.scss'
import './subscribe.scss'
import { FirebaseRef } from '../../lib/firebase'
import { Modal, Form, Input, message, Button } from 'antd';
import OwlCarousel from 'react-owl-carousel2';

class Subscribe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.id = props.match.params.id
    this.token = props.match.params.token
  }


  componentDidMount() {
    const ref = FirebaseRef.child(`Severice/${this.id}`)

    ref.on('value', snapshot => {
      const data = snapshot.val() || null
      if (data) {

        this.setState({
          data
        })

      }

    })
    setTimeout(() => {
      const { data } = this.state
      if (data.typeService) {
        if (!data.view) {
          data.view = 1
        } else {
          data.view += 1
        }

        const ref = FirebaseRef.child(`Severice/${this.id}`)
        ref.set({
          ...data
        })
      }

    }, 4000)
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {

    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {

    this.setState({
      visible: false,
    });
  };

  onFinish = values => {
    console.log('Success:', values);
    const { data } = this.state
    if (!data.subscribe) {
      data.subscribe = 1
    } else {
      data.subscribe += 1
    }

    const ref = FirebaseRef.child(`Severice/${this.id}`)
    ref.set({
      ...data
    })


    const Ref = FirebaseRef.push()
    const key = Ref.getKey()
    const ref2 = FirebaseRef.child(`Data/${this.id}/${key}`)
    ref2.set({
      ...values,
      note: 'None'
    }).then(() => {
      message.success("subscribe successfully, We will connect with you soon!")
      this.handleCancel()
    }).catch((err) => {
      message.error(err.message)
    })


  };
  render() {
    const { data, visible } = this.state
    const typeArray = ['Diagnose at the office', 'Diagnose videos realtime', 'Diagnose audio realtime']
    const options = {
      items: 1,
      merge: true,
      loop: true,
      margin: 10,
      video: true,
      lazyLoad: true,
      center: true,
      responsive: {
        480: {
          items: 2
        },
        600: {
          items: 4
        }
      }
    };


    return (
      <div className="subscribe">
        <div className="gig-page-wrapper responsive sidebar-sticky" data-gig-id={149278009} data-username="suryabella" data-slug="write-a-travel-culture-or-expat-lifestyle-article">
          {/* top -navie */}
          <div className="top-nav">
            <nav className="max-width-container">
              <ul>
                <li className="nav-overview"><a href="#overview">Overview</a>
                </li>
                <li className="nav-description"><a href="#description">Description</a>
                </li>
                <li className="nav-faq"><a href="#faq">FAQ</a>
                </li>
                <li className="nav-reviews selected"><a href="#reviews">Reviews</a>
                </li>
                <li className="nav-aboutSeller"><a href="#aboutSeller">About The Seller</a>
                </li>
                <li className="nav-packagesTable"><a href="#packagesTable">Compare Packages</a>
                </li>
                <li className="nav-recommendations"><a href="#recommendations">Recommendations</a>
                </li>
              </ul>
              <aside className="actions">
                <div className="gig-fav-wrapper">
                  <div className="gig-fav">
                    <button className="icn-heart hint--bottom-right with-text js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span><span className="heart-text">Save</span>
                    </button>
                  </div><span className="collect-count">106</span>
                </div>
                <button className="fit-button fit-button-color-green fit-button-fill-full fit-button-size-small btn-sharing-link">Share</button>
              </aside>
            </nav>
          </div>
          {/* content */}

          <div className="gig-page">
            <aside className="sidebar poly-sticky">
              <div className="packages-tabs triple">
                <input id="package-tab-1" name="package-tab-group" type="radio" defaultChecked />
                <input id="package-tab-2" name="package-tab-group" type="radio" />
                <input id="package-tab-3" name="package-tab-group" type="radio" />
                <div className="nav-container">
                  <label htmlFor="package-tab-1" className>Basic</label>
                  <label htmlFor="package-tab-2" className>Standard</label>
                  <label htmlFor="package-tab-3" className>Premium</label>
                </div>
                <div className="tabs-content">
                  <form className="content" action="/checkout/customize/149278009" method="post">
                    <input type="hidden" name="authenticity_token" defaultValue="tGhYbtlW7IiRdkKjQxPW/i3JGvDzpcIbaSf6Cq+4y5A=" />
                    <input type="hidden" name="packages[gig_id]" defaultValue={149278009} />
                    <input type="hidden" name="packages[package_id]" defaultValue={1} />
                    <input type="hidden" name="fiverr_choice" defaultValue="false" />
                    <input type="hidden" name="rising_talent" defaultValue="false" />
                    <div className="content">
                      <div>
                        <input type="hidden" name="gig_items[1][3290679879154][gig_item_id]" defaultValue={149278337} />
                        <input type="hidden" name="gig_items[1][3290679879154][quantity]" defaultValue={0} />
                      </div>
                      <div className="package-content">
                        <header>
                          <h3><b className="title">Simple Article</b><span className="price">$10</span></h3>
                          <p>A professionally researched article about any topic related to spirituality and wellbeing</p>
                        </header>
                        <article><b className="delivery">3 Days Delivery</b><b className="revisions">1 Revision</b>
                          <ul className="features">
                            <li className="feature included">Up to 250 Words</li>
                            <li className="feature included">Up to 1 Focus Word</li>
                            <li className="feature included">Topic Research</li>
                          </ul>
                        </article>
                      </div>
                      <footer>
                        <button className="btn-compare-packages">Compare Packages</button>
                      </footer>
                    </div>
                  </form>
                  <form className="content" action="/checkout/customize/149278009" method="post">
                    <input type="hidden" name="authenticity_token" defaultValue="tGhYbtlW7IiRdkKjQxPW/i3JGvDzpcIbaSf6Cq+4y5A=" />
                    <input type="hidden" name="packages[gig_id]" defaultValue={149278009} />
                    <input type="hidden" name="packages[package_id]" defaultValue={2} />
                    <input type="hidden" name="fiverr_choice" defaultValue="false" />
                    <input type="hidden" name="rising_talent" defaultValue="false" />
                    <div className="content">
                      <div>
                        <input type="hidden" name="gig_items[2][1558216979167][gig_item_id]" defaultValue={149278337} />
                        <input type="hidden" name="gig_items[2][1558216979167][quantity]" defaultValue={0} />
                      </div>
                      <div className="package-content">
                        <header>
                          <h3><b className="title">In-Depth Article</b><span className="price">$20</span></h3>
                          <p>A heavily researched and unique article about any topic related to spirituality and wellbeing</p>
                        </header>
                        <article><b className="delivery">4 Days Delivery</b><b className="revisions">1 Revision</b>
                          <ul className="features">
                            <li className="feature included">Up to 500 Words</li>
                            <li className="feature included">Up to 1 Focus Word</li>
                            <li className="feature included">Topic Research</li>
                          </ul>
                        </article>
                      </div>
                      <footer>
                        <button className="btn-compare-packages">Compare Packages</button>
                      </footer>
                    </div>
                  </form>
                  <form className="content" action="/checkout/customize/149278009" method="post">
                    <input type="hidden" name="authenticity_token" defaultValue="tGhYbtlW7IiRdkKjQxPW/i3JGvDzpcIbaSf6Cq+4y5A=" />
                    <input type="hidden" name="packages[gig_id]" defaultValue={149278009} />
                    <input type="hidden" name="packages[package_id]" defaultValue={3} />
                    <input type="hidden" name="fiverr_choice" defaultValue="false" />
                    <input type="hidden" name="rising_talent" defaultValue="false" />
                    <div className="content">
                      <div>
                        <input type="hidden" name="gig_items[3][4939392879173][gig_item_id]" defaultValue={149278337} />
                        <input type="hidden" name="gig_items[3][4939392879173][quantity]" defaultValue={0} />
                      </div>
                      <div className="package-content">
                        <header>
                          <h3><b className="title">Professional Article</b><span className="price">$40</span></h3>
                          <p>A professional and unique educational article about spirituality and wellbeing</p>
                        </header>
                        <article><b className="delivery">5 Days Delivery</b><b className="revisions">1 Revision</b>
                          <ul className="features">
                            <li className="feature included">Up to 1000 Words</li>
                            <li className="feature included">Up to 2 Focus Words</li>
                            <li className="feature included">Topic Research</li>
                          </ul>
                        </article>
                      </div>
                      <footer>
                        <button className="btn-compare-packages">Compare Packages</button>
                      </footer>
                    </div>
                  </form>
                </div>
              </div>
              <div className="contact-seller">
                <div className="custom-order">
                  <h6>Do you have any special requirements?</h6>
                  <button className="fit-button fit-button-color-grey fit-button-fill-ghost fit-button-size-small btn-get-quote js-open-popup-join">Get a Quote</button>
                </div>
                <div className="contact-seller-wrapper"><a className="fit-button fit-button-color-grey fit-button-fill-ghost fit-button-size-medium btn-contact-seller js-contact-me js-open-popup-join" href="/conversations/suryabella">Contact Seller</a>
                </div>
              </div>
            </aside>
            <div className="main"><span style={{ fontSize: '0px' }} />
              <div className="out-of-office">
                <div className="banner in-gig-page cf">
                  <div className="img-wrapper"><span className="user-pict-60"><img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b9b37505b6f8808e8ac1c613e7c7b415-1578652308893/64283c6b-240e-44fc-bb64-e0173a1860b6.jpg" alt="suryabella" data-reload="inprogress" /><span className="user-ooo-indicator" /></span>
                  </div>
                  <div className="content buyer-view">
                    <h3 className="font-accent">suryabella is Out of Office<span> until Jul 18, 2020</span></h3><small>In the meantime, you can <a href="/conversations/suryabella" className="js-contact-me">contact</a> suryabella</small>
                  </div>
                </div>
              </div>
              <div className="gig-overview">
                <nav className="breadcrumbs text-body-2"><a href="/categories/writing-translation?source=gig_category_link">Writing &amp; Translation</a><a href="/categories/writing-translation/articles-blogposts?source=gig_sub_category_link">Articles &amp; Blog Posts</a>
                </nav>
                <h1 className="text-display-3">I will write a spirituality, mental health, and wellbeing article or blog post</h1>
                <div className="seller-overview">
                  <div className="user-profile-image">
                    <label className="profile-pict" htmlFor="profile_image" style={{ width: '32px', height: '32px', fontSize: '1em' }}>
                      <img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b9b37505b6f8808e8ac1c613e7c7b415-1578652308893/64283c6b-240e-44fc-bb64-e0173a1860b6.jpg" className="profile-pict-img" alt="suryabella" />
                    </label>
                    <div className="profile-name"><span className="user-status"><a href="/suryabella" className="seller-link">suryabella</a></span>
                      <div data-hint="Completed at least 50 orders on time with a minimum 4.8 rating" className="seller-level hint hint--top">Level 2 Seller</div>
                    </div>
                  </div>
                  <div className="user-info"><span className="user-info-rating"><div className="star-rating-s15-wrapper"><span className="star-rating-s15 rate-10" />
                  </div><span className="total-rating-out-five">5.0</span><span className="total-rating">(9)</span></span><span className="orders-in-queue">2 Orders in Queue</span>
                  </div>
                </div>
              </div><span style={{ fontSize: '0px' }} /><span style={{ fontSize: '0px' }} />
              <section className="gig-gallery-component">

                <OwlCarousel ref="car" options={options}  >
                  <div><img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/129054418/original/f8ffa33499f0111fb245a497bfa5b7e72cdb765b/modify-or-revamp-your-weebly-website-template.jpg" alt="The Last of us" /></div>
                  <div><img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/129054418/original/4a1b599b58b7035f0b751919365c545ba521ebb6/modify-or-revamp-your-weebly-website-template.png" alt="GTA V" /></div>

                </OwlCarousel>

              </section>

              <div className="gig-description">
                <header>
                  <h2 className="section-title">About This Gig</h2>
                </header>


                <div className="description-wrapper">
                  <div className="description-content"><b><u /></b><u>**PLEASE CONTACT ME BEFORE PLACING AN ORDER**</u>
                    <br />
                    <br />I have <i><b>years of experience</b></i> in psychology, writing, and wellness, so I thought to combine my passions into one! I also use my background in marketing when writing any article or blog post and employ standard SEO practices. All of my articles are 100% original.
                <br />
                    <br /><span>Through my <u>degree in psychology, religious studies, and biology</u> from a university in the United States, I have gained a lot of knowledge on topics related to wellbeing and spirituality.&nbsp;<br /></span>
                    <br />I have also worked professionally in the field of psychology as a research assistant and have multiple publications currently in press at some&nbsp;<b>major scientific research journals.&nbsp;<br /><br />Sample Article Topics:</b>
                    <ul>
                      <li>General mental health tips</li>
                      <li>Psychology and philosophy&nbsp;</li>
                      <li>Mindfulness and wellness&nbsp;</li>
                      <li>Yoga</li>
                      <li>Alternative healing practices&nbsp;</li>
                      <li>Meditation&nbsp;</li>
                      <li>Ayurveda</li>
                      <li>Culture and mental health&nbsp;</li>
                      <li>Stress management</li>
                      <li>Spirituality&nbsp;</li>
                      <li>World religions&nbsp;</li>
                      <li>Connecting with God&nbsp;</li>
                      <li>The difference between religion and spirituality&nbsp;</li>
                      <li>New Age spirituality&nbsp;</li>
                      <li>The history of religion and spirituality&nbsp;</li>
                    </ul>
                    <br /><u>**Please contact me for details on larger orders**</u>
                    <br />
                  </div>
                  <div className="cover" />
                  <button className="collapse-button">+ See More</button>
                </div>
                <ul className="metadata">
                  <li className="metadata-attribute">
                    <p>Language</p>
                    <ul>
                      <li>English</li>
                    </ul>
                  </li>
                  <li className="metadata-attribute">
                    <p>Tone</p>
                    <ul>
                      <li>Conversational</li>
                      <li>Professional/formal</li>
                    </ul>
                  </li>
                  <li className="metadata-attribute">
                    <p>Article Type</p>
                    <ul>
                      <li>Instructional/how-to</li>
                      <li>Listicle</li>
                      <li>Long-form article</li>
                    </ul>
                  </li>
                  <li className="metadata-attribute">
                    <p>Topic</p>
                    <ul>
                      <li>Health &amp; Medical</li>
                      <li>Lifestyle</li>
                    </ul>
                  </li>
                </ul>
              </div><span style={{ fontSize: '0px' }} />
              <h2 className="section-title about-the-seller">About The Seller</h2>
              <div className="profile-card">
                <div className="seller-card">
                  <div className="profile-info">
                    <div className="user-profile-image">
                      <label className="profile-pict" htmlFor="profile_image" style={{ width: '110px', height: '110px', fontSize: '2.2em' }}>
                        <img src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b9b37505b6f8808e8ac1c613e7c7b415-1578652308893/64283c6b-240e-44fc-bb64-e0173a1860b6.jpg" className="profile-pict-img" alt="suryabella" />
                        <a href="/levels" className="user-badge-round md locale-en-us level-two-seller" />
                      </label>
                    </div>
                    <div className="user-profile-label">
                      <div className="username-line"><a href="/suryabella" className="seller-link">suryabella</a>
                        <div className="status ooo-indicator">Out of Office</div>
                      </div>
                      <div className="one-liner-rating-wrapper"><small>Yoga Teacher, Writer, Editor, and Web Designer from the United States</small>
                        <div className="rating-wrapper"><span className="star-rating-s15 rate-10" />
                          <p className="rating-text"><strong>5.0</strong> (130 reviews)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="stats-desc">
                    <ul className="user-stats">
                      <li>From<strong>United States</strong>
                      </li>
                      <li>Member since<strong>Jan 2020</strong>
                      </li>
                      <li>Avg. response time<strong>1 hour</strong>
                      </li>
                      <li>Last delivery<strong>about 8 hours</strong>
                      </li>
                    </ul>
                    <article className="seller-desc">
                      <div className="inner">Hi! My name is Isabella and I am a yoga teacher with a BSc in Psychology, Biology, and Religion. Through my extensive experience in yoga and the health industry as well as in web design, content writing, and marketing, I hope to combine my skills into one to help others share the benefits of yoga. Although I still work as a yoga teacher, I primarily use my knowledge of psychology and yoga to perfectly tailor online marketing materials to help others ethically and consciously share their yoga experience. Are you a yoga professional looking to increase your online presence? Contact me today!</div>
                      <button className="read-more">+ See More</button>
                    </article>
                  </div>
                </div>
              </div><span style={{ fontSize: '0px' }} />
              <form className="gig-page-packages-table-form" action="/checkout/customize/149278009" method="post">
                <input type="hidden" name="authenticity_token" defaultValue="tGhYbtlW7IiRdkKjQxPW/i3JGvDzpcIbaSf6Cq+4y5A=" />
                <input type="hidden" name="packages[gig_id]" defaultValue={149278009} />
                <input type="hidden" name="packages[package_id]" defaultValue={0} />
                <input type="hidden" name="fiverr_choice" defaultValue="false" />
                <input type="hidden" name="rising_talent" defaultValue="false" />
                <div className="gig-page-packages-table">
                  <h2 className="section-title">Compare Packages</h2>
                  <table>
                    <colgroup>
                      <col />
                      <col />
                      <col />
                      <col />
                    </colgroup>
                    <tbody>
                      <tr className="package-type">
                        <th>Package</th>
                        <td>
                          <p className="price">$10</p><b className="type">Basic</b><b className="title">Simple Article</b>
                        </td>
                        <td>
                          <p className="price">$20</p><b className="type">Standard</b><b className="title">In-Depth Article</b>
                        </td>
                        <td>
                          <p className="price">$40</p><b className="type">Premium</b><b className="title">Professional Article</b>
                        </td>
                      </tr>
                      <tr className="description">
                        <th />
                        <td>A professionally researched article about any topic related to spirituality and wellbeing</td>
                        <td>A heavily researched and unique article about any topic related to spirituality and wellbeing</td>
                        <td>A professional and unique educational article about spirituality and wellbeing</td>
                      </tr>
                      <tr>
                        <th>
                          <div className="fit-popover fit-popover-top fit-tooltip" data-position="top"><span className="fit-popover-content">Topic Research</span>
                          </div>
                        </th>
                        <td className="boolean-pricing-factor included" />
                        <td className="boolean-pricing-factor included" />
                        <td className="boolean-pricing-factor included" />
                      </tr>
                      <tr>
                        <th>
                          <div className="fit-popover fit-popover-top fit-tooltip" data-position="top"><span className="fit-popover-content">Words Included</span>
                          </div>
                        </th>
                        <td>250</td>
                        <td>500</td>
                        <td>1000</td>
                      </tr>
                      <tr>
                        <th>
                          <div className="fit-popover fit-popover-top fit-tooltip" data-position="top"><span className="fit-popover-content">Focus Keywords</span>
                          </div>
                        </th>
                        <td>1</td>
                        <td>1</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <th>
                          <div className="fit-popover fit-popover-top fit-tooltip" data-position="top"><span className="fit-popover-content">Revisions</span>
                          </div>
                        </th>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                      </tr>
                      <tr className="delivery-time">
                        <th>Delivery Time</th>
                        <td>
                          <div className="fake-radio-wrapper">
                            <div>
                              <input type="hidden" name="gig_items[1][2276701687144][gig_item_id]" defaultValue={149278337} />
                              <input type="hidden" name="gig_items[1][2276701687144][quantity]" defaultValue={0} />
                            </div>
                            <label className="fake-radio">
                              <input type="radio" name={1} defaultValue={0} defaultChecked /><span className="radio-img" /><span>3 days</span>
                            </label>
                            <label className="fake-radio">
                              <input type="radio" name={1} defaultValue={1} /><span className="radio-img" /><span>1 day</span>
                              <p className="faster-price">(+$10)</p>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="fake-radio-wrapper">
                            <div>
                              <input type="hidden" name="gig_items[2][5531408887146][gig_item_id]" defaultValue={149278337} />
                              <input type="hidden" name="gig_items[2][5531408887146][quantity]" defaultValue={0} />
                            </div>
                            <label className="fake-radio">
                              <input type="radio" name={2} defaultValue={0} defaultChecked /><span className="radio-img" /><span>4 days</span>
                            </label>
                            <label className="fake-radio">
                              <input type="radio" name={2} defaultValue={1} /><span className="radio-img" /><span>1 day</span>
                              <p className="faster-price">(+$15)</p>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="fake-radio-wrapper">
                            <div>
                              <input type="hidden" name="gig_items[3][5975773787149][gig_item_id]" defaultValue={149278337} />
                              <input type="hidden" name="gig_items[3][5975773787149][quantity]" defaultValue={0} />
                            </div>
                            <label className="fake-radio">
                              <input type="radio" name={3} defaultValue={0} defaultChecked /><span className="radio-img" /><span>5 days</span>
                            </label>
                            <label className="fake-radio">
                              <input type="radio" name={3} defaultValue={1} /><span className="radio-img" /><span>1 day</span>
                              <p className="faster-price">(+$25)</p>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form><span style={{ fontSize: '0px' }} />
              <div className="gig-card-carousel-wrapper gigs-recommended-for-you">
                <h2 className="section-title">Recommended For You</h2>
                <div className="listing-carousel gig-card-layout">
                  <div className="slider-package">
                    <div className="slick-slider slick-slider slick-initialized" dir="ltr">
                      <button className="slick-arrow slick-prev slick-disabled" />
                      <div className="slick-list">
                        <div className="slick-track" style={{ width: '2892px', opacity: 1, transform: 'translate3d(0px, 0px, 0px)' }}>
                          <div data-index={0} className="slick-slide slick-active slick-current" tabIndex={-1} aria-hidden="false" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={149860993} data-impression-collected="true">
                                    <a href="/naveed_writer/be-writing-mental-health-article-and-fitness-blog-post?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=1&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/149860993/original/27ee23783b178f3f11aa1863f023711f107722f5.png" srcSet="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/149860993/original/27ee23783b178f3f11aa1863f023711f107722f5.png 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/149860993/original/27ee23783b178f3f11aa1863f023711f107722f5.png 2x" alt="be writing mental health article and fitness blog post" loading="lazy" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>n</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/0eaf46b265cf76685ef3676d09812189-856108811584988639841/JPEG_20200323_233717_6484483108726537631.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/naveed_writer?source=gig_cards&referrer_gig_slug=be-writing-mental-health-article-and-fitness-blog-post&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>naveed_writer</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/naveed_writer/be-writing-mental-health-article-and-fitness-blog-post?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=1&is_pro=false&context_alg=text_to_gig" target="_self" title="I will be writing mental health article and fitness blog post">I will be writing mental health article and fitness blog post</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(9)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/naveed_writer/be-writing-mental-health-article-and-fitness-blog-post?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=1&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$5"><small className="text-body-3">Starting at</small>$5</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={1} className="slick-slide slick-active" tabIndex={-1} aria-hidden="false" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={149421387} data-impression-collected="true">
                                    <a href="/livingliberteco/write-a-blog-about-mental-health?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=2&is_pro=false&context_alg=text_to_gig&seller_online=true" target="_self" className="media">
                                      <div className="slider"><span className="arrow next" />
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <div className="player">
                                              <img src="https://fiverr-res.cloudinary.com/video/upload/so_1.869503,t_gig_cards_web/mgybg66audyke45lzdjy.png" alt="write a blog about mental health" loading="lazy" /><span className="video-button-wrapper"><span className="video-button play" />
                                                <svg className="video-player-progress" viewBox="-2 -4 40 40">
                                                  <circle className="progress-bar-background" r={14} cx={18} cy={14} />
                                                  <circle className="progress-bar" r={14} cx={18} cy={14} style={{ strokeDasharray: '100, 100' }} />
                                                </svg>
                                              </span>
                                              <video />
                                            </div>
                                          </div>
                                        </div><span className="arrow prev" />
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><span className="is-online" />
                                        <figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}>
                                          <figcaption className>l</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/b53c2afffea3b22d5497635a095a6f78-1582406505523/3ccf9adc-abcd-4f8c-bdaa-061f23b72d97.jpeg")' }} />
                                        </figure>
                                      </span><span className="seller-name"><a href="/livingliberteco?source=gig_cards&referrer_gig_slug=write-a-blog-about-mental-health&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>livingliberteco</a><span className="level hint--bottom-right level-two-seller" data-hint="Completed at least 50 orders on time with a minimum 4.8 rating">Level 2 Seller</span></span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/livingliberteco/write-a-blog-about-mental-health?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=2&is_pro=false&context_alg=text_to_gig&seller_online=true" target="_self" title="I will write a blog about mental health">I will write a blog about mental health</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(12)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/livingliberteco/write-a-blog-about-mental-health?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=2&is_pro=false&context_alg=text_to_gig&seller_online=true" target="_self" className="price" title="$50"><small className="text-body-3">Starting at</small>$50</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={2} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={3287086}>
                                    <a href="/alaina19/research-and-write-a-psychology-article?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=3&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3287086/original/computer-313841_640.jpg" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3287086/original/computer-313841_640.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/3287086/original/computer-313841_640.jpg 2x" className=" lazyloading" alt="research and write a psychology article" loading="lazy" srcSet="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3287086/original/computer-313841_640.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/3287086/original/computer-313841_640.jpg 2x" src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3287086/original/computer-313841_640.jpg" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>a</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/profile/photos/3283200/original/400201_325316007499334_1191503746_n.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/alaina19?source=gig_cards&referrer_gig_slug=research-and-write-a-psychology-article&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>alaina19</a><span className="level hint--bottom-right level-two-seller" data-hint="Completed at least 50 orders on time with a minimum 4.8 rating">Level 2 Seller</span></span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/alaina19/research-and-write-a-psychology-article?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=3&is_pro=false&context_alg=text_to_gig" target="_self" title="I will research and write a psychology article">I will research and write a psychology article</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(1k+)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/alaina19/research-and-write-a-psychology-article?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=3&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$5"><small className="text-body-3">Starting at</small>$5</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={3} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={99530162}>
                                    <a href="/karamathajira00/create-perfect-resume-or-cv-for-you?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=4&is_pro=false&context_alg=text_to_gig&seller_online=true" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99530162/original/840b1e6d717ae3037ca5cf9f99ec0577f7565967.jpg" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99530162/original/840b1e6d717ae3037ca5cf9f99ec0577f7565967.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/99530162/original/840b1e6d717ae3037ca5cf9f99ec0577f7565967.jpg 2x" className=" lazyloading" alt="give you perfect mental health blog or article" loading="lazy" srcSet="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99530162/original/840b1e6d717ae3037ca5cf9f99ec0577f7565967.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/99530162/original/840b1e6d717ae3037ca5cf9f99ec0577f7565967.jpg 2x" src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99530162/original/840b1e6d717ae3037ca5cf9f99ec0577f7565967.jpg" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><span className="is-online" />
                                        <figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}>
                                          <figcaption className>k</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/209582876c600b3f9883799073908655-1540103213967/a9ec0b92-4153-43e5-8de1-82a81d7ce559.jpg")' }} />
                                        </figure>
                                      </span><span className="seller-name"><a href="/karamathajira00?source=gig_cards&referrer_gig_slug=create-perfect-resume-or-cv-for-you&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>karamathajira00</a><span className="level hint--bottom-right level-one-seller" data-hint="Completed at least 10 orders on time with a minimum 4.8 rating">Level 1 Seller</span></span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/karamathajira00/create-perfect-resume-or-cv-for-you?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=4&is_pro=false&context_alg=text_to_gig&seller_online=true" target="_self" title="I will give you perfect mental health blog or article">I will give you perfect mental health blog or article</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>4.6<span>(19)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/karamathajira00/create-perfect-resume-or-cv-for-you?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=4&is_pro=false&context_alg=text_to_gig&seller_online=true" target="_self" className="price" title="$10"><small className="text-body-3">Starting at</small>$10</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={4} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card pro-experience" data-gig-id={125346141}>
                                    <a href="/morena2003/write-a-psychology-blog-post?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=5&is_pro&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider"><span className="arrow next" />
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125346141/original/3c0a60c8f4eae59952ee1810b67f4cb32ff4cf68.png" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125346141/original/3c0a60c8f4eae59952ee1810b67f4cb32ff4cf68.png 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/125346141/original/3c0a60c8f4eae59952ee1810b67f4cb32ff4cf68.png 2x" className=" lazyloading" alt="write a psychology blog post or article" loading="lazy" srcSet="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125346141/original/3c0a60c8f4eae59952ee1810b67f4cb32ff4cf68.png 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/125346141/original/3c0a60c8f4eae59952ee1810b67f4cb32ff4cf68.png 2x" src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125346141/original/3c0a60c8f4eae59952ee1810b67f4cb32ff4cf68.png" />
                                          </div>
                                        </div><span className="arrow prev" />
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>m</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/e699735c2e6f58a095101d87ad60f1c0-1582668186901/ab244764-684a-4082-ae2c-b6d1a75ad794.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/morena2003?source=gig_cards&referrer_gig_slug=write-a-psychology-blog-post&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>morena2003</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/morena2003/write-a-psychology-blog-post?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=5&is_pro&context_alg=text_to_gig" target="_self" title="I will write a psychology blog post or article">I will write a psychology blog post or article</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>4.8<span>(11)</span></span>
                                      </div>
                                      <div className="badge-wrapper">
                                        <div className="gig-badge pro hint--bottom-right" data-hint="This Gig is offered by unrivaled talent verified by Fiverr for quality and service." />
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/morena2003/write-a-psychology-blog-post?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=5&is_pro&context_alg=text_to_gig" target="_self" className="price" title="$125"><small className="text-body-3">Starting at</small>$125</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={5} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={134132232}>
                                    <a href="/sonalshiraguppi/write-content-on-positivism-and-spirituality-for-you?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=6&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider"><span className="arrow next" />
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/134132232/original/16a3c1afbbdd74dcfaba9b0bf97308988b63fc15.jpg" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/134132232/original/16a3c1afbbdd74dcfaba9b0bf97308988b63fc15.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/134132232/original/16a3c1afbbdd74dcfaba9b0bf97308988b63fc15.jpg 2x" className=" lazyloading" alt="write content on positivism and spirituality for you" loading="lazy" srcSet="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/134132232/original/16a3c1afbbdd74dcfaba9b0bf97308988b63fc15.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/134132232/original/16a3c1afbbdd74dcfaba9b0bf97308988b63fc15.jpg 2x" src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/134132232/original/16a3c1afbbdd74dcfaba9b0bf97308988b63fc15.jpg" />
                                          </div>
                                        </div><span className="arrow prev" />
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>s</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/ba9c3f8277e0aa82de186e9c12ffcebd-1587237204703/e504a46e-4bc0-48ec-ac07-a5062ea7b348.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/sonalshiraguppi?source=gig_cards&referrer_gig_slug=write-content-on-positivism-and-spirituality-for-you&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>sonalshiraguppi</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/sonalshiraguppi/write-content-on-positivism-and-spirituality-for-you?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=6&is_pro=false&context_alg=text_to_gig" target="_self" title="I will write content on positivism and spirituality for you">I will write content on positivism and spirituality for you</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>4.9<span>(6)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/sonalshiraguppi/write-content-on-positivism-and-spirituality-for-you?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=6&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$10"><small className="text-body-3">Starting at</small>$10</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={6} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={137797455}>
                                    <a href="/taraga/write-expert-health-medical-article-or-blog-post-urgently?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=7&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/137797455/original/a643ed9b159a2154fe70a29526668fef3ed3f939.png" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/137797455/original/a643ed9b159a2154fe70a29526668fef3ed3f939.png 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/137797455/original/a643ed9b159a2154fe70a29526668fef3ed3f939.png 2x" className="lazyload" alt="write expert health, medical article or blog post urgently" loading="lazy" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>t</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/d5680e0d70717aeff6c3f677ebad35f0-1570818173622/cef614d6-c6bf-4444-afe9-b74b1cc8acb5.png")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/taraga?source=gig_cards&referrer_gig_slug=write-expert-health-medical-article-or-blog-post-urgently&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>taraga</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/taraga/write-expert-health-medical-article-or-blog-post-urgently?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=7&is_pro=false&context_alg=text_to_gig" target="_self" title="I will write expert health, medical article or blog post urgently">I will write expert health, medical article or blog post urgently</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(9)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/taraga/write-expert-health-medical-article-or-blog-post-urgently?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=7&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$25"><small className="text-body-3">Starting at</small>$25</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={7} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={152260332}>
                                    <a href="/roshdynaahmad/write-2-blog-post-on-mental-health-of-800-words?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=8&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/152260332/original/b2eb861adc13bb9ad9a1391c7c1cc82572aeb1f4.jpg" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/152260332/original/b2eb861adc13bb9ad9a1391c7c1cc82572aeb1f4.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/152260332/original/b2eb861adc13bb9ad9a1391c7c1cc82572aeb1f4.jpg 2x" className="lazyload" alt="write 1 blog post on mental health of 500 words" loading="lazy" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>r</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/39e0e20cace5f4e6f0e28a93be8d4bd8-1586624595685/80f3f3cb-78ea-48cd-9c6a-9f178233a499.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/roshdynaahmad?source=gig_cards&referrer_gig_slug=write-2-blog-post-on-mental-health-of-800-words&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>roshdynaahmad</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/roshdynaahmad/write-2-blog-post-on-mental-health-of-800-words?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=8&is_pro=false&context_alg=text_to_gig" target="_self" title="I will write 1 blog post on mental health of 500 words">I will write 1 blog post on mental health of 500 words</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(11)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/roshdynaahmad/write-2-blog-post-on-mental-health-of-800-words?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=8&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$5"><small className="text-body-3">Starting at</small>$5</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={8} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={147602097}>
                                    <a href="/oqabwriter/write-health-and-fitness-seo-friendly-article-content-writing-blog-post-rewrite?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=9&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/147602097/original/aa4d2f3583869ea89fc2dfdfb614332821e3effe.jpg" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/147602097/original/aa4d2f3583869ea89fc2dfdfb614332821e3effe.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/147602097/original/aa4d2f3583869ea89fc2dfdfb614332821e3effe.jpg 2x" className="lazyload" alt="write health and fitness SEO friendly article content writing blog post rewrite" loading="lazy" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>o</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/5d386fa565919d060a08f51f7cda4ad5-1583323797046/6a7298c0-72c7-4575-9356-de58ed53cdb3.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/oqabwriter?source=gig_cards&referrer_gig_slug=write-health-and-fitness-seo-friendly-article-content-writing-blog-post-rewrite&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>oqabwriter</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/oqabwriter/write-health-and-fitness-seo-friendly-article-content-writing-blog-post-rewrite?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=9&is_pro=false&context_alg=text_to_gig" target="_self" title="I will write health and fitness SEO friendly article content writing blog post rewrite">I will write health and fitness SEO friendly article content writing blog post rewrite</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(10)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/oqabwriter/write-health-and-fitness-seo-friendly-article-content-writing-blog-post-rewrite?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=9&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$5"><small className="text-body-3">Starting at</small>$5</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={9} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={152194088}>
                                    <a href="/fareeha2000/write-you-a-creative-story?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=10&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider"><span className="arrow next" />
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/152194088/original/74ec5b84cf7de100482cc141370245c1bccf4229.jpeg" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/152194088/original/74ec5b84cf7de100482cc141370245c1bccf4229.jpeg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/152194088/original/74ec5b84cf7de100482cc141370245c1bccf4229.jpeg 2x" className="lazyload" alt="write  SEO  health, fitness and wellness blog posts" loading="lazy" />
                                          </div>
                                        </div><span className="arrow prev" />
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>f</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/56ec5bbb030c2c19ed9277ebb81e81d2-1586647524972/63cdbf71-9b25-4d58-ac50-b436f76f4a5b.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/fareeha2000?source=gig_cards&referrer_gig_slug=write-you-a-creative-story&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>fareeha2000</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/fareeha2000/write-you-a-creative-story?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=10&is_pro=false&context_alg=text_to_gig" target="_self" title="I will write  SEO  health, fitness and wellness blog posts">I will write  SEO  health, fitness and wellness blog posts</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>4.9<span>(7)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/fareeha2000/write-you-a-creative-story?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=10&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$5"><small className="text-body-3">Starting at</small>$5</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={10} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={154147048}>
                                    <a href="/adriabiasi/write-health-and-fitness-blog-posts-and-for-other-sources?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=11&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/154147048/original/0edbb3137c16d712773dae08c8a159dd866cf20b.png" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/154147048/original/0edbb3137c16d712773dae08c8a159dd866cf20b.png 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/154147048/original/0edbb3137c16d712773dae08c8a159dd866cf20b.png 2x" className="lazyload" alt="write health and fitness blog posts and for other sources" loading="lazy" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>a</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/ad53f2a5de66949284bc8b092febddb8-1587656766122/08494dc9-7a08-494e-8c78-923edf41774c.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/adriabiasi?source=gig_cards&referrer_gig_slug=write-health-and-fitness-blog-posts-and-for-other-sources&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>adriabiasi</a>
                                        </span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/adriabiasi/write-health-and-fitness-blog-posts-and-for-other-sources?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=11&is_pro=false&context_alg=text_to_gig" target="_self" title="I will write health and fitness blog posts and for other sources">I will write health and fitness blog posts and for other sources</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(16)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/adriabiasi/write-health-and-fitness-blog-posts-and-for-other-sources?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=11&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$40"><small className="text-body-3">Starting at</small>$40</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div data-index={11} className="slick-slide" tabIndex={-1} aria-hidden="true" style={{ outline: 'none', width: '241px' }}>
                            <div>
                              <div className="gig-card-layout">
                                <div>
                                  <div className="gig-wrapper card" data-gig-id={41236480}>
                                    <a href="/chihera/be-your-virtual-assistant-3-hours-per-day?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=12&is_pro=false&context_alg=text_to_gig" target="_self" className="media">
                                      <div className="slider">
                                        <div className="slides preview">
                                          <div className="slide-item active" style={{ width: 'auto' }}>
                                            <img data-src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/41236480/original/a15c018278d9b9d9ee8fa81b623b9aaa9e18f438.jpg" data-srcset="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/41236480/original/a15c018278d9b9d9ee8fa81b623b9aaa9e18f438.jpg 1x, https://fiverr-res.cloudinary.com/t_gig_cards_web_x2,q_auto,f_auto/gigs/41236480/original/a15c018278d9b9d9ee8fa81b623b9aaa9e18f438.jpg 2x" className="lazyload" alt="write your holistic health article" loading="lazy" />
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="seller-info text-body-2">
                                      <div className="inner-wrapper"><span className="seller-image"><figure className="fit-avatar-figure fit-avatar-circle-shape" style={{ fontSize: '24px' }}><figcaption className>c</figcaption><span className="fit-avatar-image" style={{ backgroundImage: 'url("https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/profile/photos/33872196/original/Sipiwe_Chihera.jpg")' }} />
                                      </figure>
                                      </span><span className="seller-name"><a href="/chihera?source=gig_cards&referrer_gig_slug=be-your-virtual-assistant-3-hours-per-day&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d" rel="nofollow noopener noreferrer" target="_self"><span>by&nbsp;</span>chihera</a><span className="level hint--bottom-right level-two-seller" data-hint="Completed at least 50 orders on time with a minimum 4.8 rating">Level 2 Seller</span></span>
                                      </div>
                                    </div>
                                    <h3 className="text-display-7"><a href="/chihera/be-your-virtual-assistant-3-hours-per-day?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=12&is_pro=false&context_alg=text_to_gig" target="_self" title="I will write your holistic health article">I will write your holistic health article</a></h3>
                                    <div className="content-info">
                                      <div className="rating-wrapper"><span className="gig-rating text-body-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width={15} height={15}><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" /></svg>5.0<span>(382)</span></span>
                                      </div>
                                    </div>
                                    <footer>
                                      <div className="gig-fav">
                                        <button className="icn-heart hint--top js-open-popup-join" data-hint="Add to Saved"><span className="fit-icon" style={{ width: '16px', height: '16px' }}><svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" /></svg></span>
                                        </button>
                                      </div><a href="/chihera/be-your-virtual-assistant-3-hours-per-day?context_referrer=gig_page&source=similar_gigs&ref_ctx_id=6efc7751-af86-4615-85d9-7c3186a2324d&context=recommendation&pckg_id=1&pos=12&is_pro=false&context_alg=text_to_gig" target="_self" className="price" title="$40"><small className="text-body-3">Starting at</small>$40</a>
                                    </footer>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="slick-arrow slick-next" />
                    </div>
                  </div>
                </div>
              </div><span style={{ fontSize: '0px' }} />
              <div className="faq-collapsable is-collapsed">
                <h2 className="section-title"><span className="fit-icon faq-collapser" style={{ width: '16px', height: '16px' }}><svg width={8} height={16} viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" /></svg></span>FAQ</h2>
                <div className="fit-collapsible-group">
                  <article className="fit-collapsible">
                    <div className="fit-collapsible-title-wrapper">
                      <div className="fit-collapsible-title">
                        <p className="question">Can you write about any other topics?</p>
                      </div>
                      <div className="fit-collapsible-chevron-wrapper"><span className="fit-icon fit-collapsible-chevron" style={{ width: '14px', height: '14px' }}><svg width={8} height={16} viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" /></svg></span>
                      </div>
                    </div>
                    <div className="fit-collapsible-content" style={{ height: '0px' }}>
                      <p className="answer">Yes I can! Just message me with any topic you have in mind and we can discuss the possibilities.</p>
                    </div>
                  </article>
                </div>
              </div><span style={{ fontSize: '0px' }} />
              <div className="reviews-package is-collapsed is-collapsable">
                <header className="reviews-header breakdown-header">
                  <div className="details">
                    <h2 className="text-display-5">9 Reviews<small className="review-rating"><span className="review-star rate-10" /><span><span className="total-rating-out-five header-average-rating" data-impression-collected="true">5</span></span></small></h2><span className="fit-icon reviews-collapser" style={{ width: '16px', height: '16px' }}><svg width={8} height={16} viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" /></svg></span>
                  </div><span><div className="filter-reviews"><h6 className="filter-dropdown-text">Sort By</h6><div className="fit-popover fit-popover-bottom-left fit-popover-clickable fit-select-wrapper" data-position="bottom-left"><span className="fit-popover-content fit-select filter-reviews-select"><span className="fit-select-value" style={{ minWidth: '181px' }}>Most Relevant<span className="fit-icon fit-select-caret" style={{ width: '11px', height: '11px' }}><svg width={11} height={7} viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg"><path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z" /></svg></span></span>
                    <input type="hidden" defaultValue="relevant_by_work_sample" />
                  </span>
                  </div>
                  </div>
                  </span>
                </header>
                <div className="breakdown-wrapper grid-12">
                  <div className="col-12-xs col-6-sm">
                    <table className="stars-counters">
                      <tbody>
                        <tr className>
                          <td><span><button className="fit-button fit-button-color-blue fit-button-fill-ghost fit-button-size-medium stars-filter" data-impression-collected="true">5 Stars</button></span>
                          </td>
                          <td className="progress-bar-container">
                            <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                              <div className="fit-progressbar-background"><span className="progress-fill" style={{ width: '100%' }} />
                              </div>
                            </div>
                          </td>
                          <td className="star-num">(9)</td>
                        </tr>
                        <tr className="no-rating">
                          <td><span><button className="fit-button fit-button-color-grey fit-button-fill-ghost fit-button-size-medium stars-filter fit-button-disabled" disabled data-impression-collected="true">4 Stars</button></span>
                          </td>
                          <td className="progress-bar-container">
                            <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                              <div className="fit-progressbar-background"><span className="progress-fill" style={{ width: '0%' }} />
                              </div>
                            </div>
                          </td>
                          <td className="star-num">(0)</td>
                        </tr>
                        <tr className="no-rating">
                          <td><span><button className="fit-button fit-button-color-grey fit-button-fill-ghost fit-button-size-medium stars-filter fit-button-disabled" disabled data-impression-collected="true">3 Stars</button></span>
                          </td>
                          <td className="progress-bar-container">
                            <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                              <div className="fit-progressbar-background"><span className="progress-fill" style={{ width: '0%' }} />
                              </div>
                            </div>
                          </td>
                          <td className="star-num">(0)</td>
                        </tr>
                        <tr className="no-rating">
                          <td><span><button className="fit-button fit-button-color-grey fit-button-fill-ghost fit-button-size-medium stars-filter fit-button-disabled" disabled data-impression-collected="true">2 Stars</button></span>
                          </td>
                          <td className="progress-bar-container">
                            <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                              <div className="fit-progressbar-background"><span className="progress-fill" style={{ width: '0%' }} />
                              </div>
                            </div>
                          </td>
                          <td className="star-num">(0)</td>
                        </tr>
                        <tr className="no-rating">
                          <td><span><button className="fit-button fit-button-color-grey fit-button-fill-ghost fit-button-size-medium stars-filter fit-button-disabled" disabled data-impression-collected="true">1 Star</button></span>
                          </td>
                          <td className="progress-bar-container">
                            <div className="fit-progressbar fit-progressbar-bar star-progress-bar">
                              <div className="fit-progressbar-background"><span className="progress-fill" style={{ width: '0%' }} />
                              </div>
                            </div>
                          </td>
                          <td className="star-num">(0)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12-xs col-6-sm">
                    <div className="ranking">
                      <h6 className="text-display-7">Rating Breakdown</h6>
                      <ul>
                        <li>Seller communication level<span>5<span className="review-star rate-10 show-one" /></span>
                        </li>
                        <li>Recommend to a friend<span>5<span className="review-star rate-10 show-one" /></span>
                        </li>
                        <li>Service as described<span>5<span className="review-star rate-10 show-one" /></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="reviews-wrap">
                  <ul className="review-list">
                    <li className="review-item review-country">
                      <div className="user-profile-image">
                        <label className="profile-pict" htmlFor="profile_image" style={{ width: '32px', height: '32px', fontSize: '1em' }}>
                          <img src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/11d17c8806ae32dd681c21dc6f55fad9-1590106020798/1d95e848-183e-4a68-a175-4742177d48d8.jpg" className="profile-pict-img" alt="tiffanydias" />
                        </label>
                      </div>
                      <header>
                        <div className="reviewer-details">
                          <h5>tiffanydias</h5><small className="review-rating"><span className="review-star rate-10 show-one" /><span className="total-rating-out-five">5</span></small>
                        </div>
                        <div className="country">
                          <img className="country-flag" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png" alt="1f1fa-1f1f8.png" />
                          <div className="country-name font-accent">United States</div>
                        </div>
                      </header>
                      <div className="review-description">
                        <p className="text-body-2">The seller was very patient and understanding. She delivers quality content and on schedule. I will def recommend her and work with her again!</p>
                      </div><span className="summarize"><time className="text-body-2">Published 2 weeks ago</time></span>
                      <div className="helpful-thumbs">
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.5804 7.81165C13.8519 7.45962 14 7 14 6.43858C14 5.40843 13.123 4.45422 12.0114 4.45422H10.0932C10.3316 3.97931 10.6591 3.39024 10.6591 2.54516C10.6591 0.948063 10.022 0 8.39207 0C7.57189 0 7.26753 1.03682 7.11159 1.83827C7.01843 2.31708 6.93041 2.76938 6.65973 3.04005C6.01524 3.68457 5.03125 5.25 4.44013 5.56787C4.38028 5.59308 4.3038 5.61293 4.22051 5.62866C4.06265 5.39995 3.79889 5.25 3.5 5.25H0.875C0.391754 5.25 0 5.64175 0 6.125V13.125C0 13.6082 0.391754 14 0.875 14H3.5C3.98325 14 4.375 13.6082 4.375 13.125V12.886C5.26354 12.886 7.12816 14.0002 9.22728 13.9996C9.37781 13.9997 10.2568 14.0004 10.3487 13.9996C11.9697 14 12.8713 13.0183 12.8188 11.5443C13.2325 11.0596 13.4351 10.3593 13.3172 9.70944C13.6578 9.17552 13.7308 8.42237 13.5804 7.81165ZM0.875 13.125V6.125H3.5V13.125H0.875ZM12.4692 7.5565C12.9062 7.875 12.9062 9.1875 12.3159 9.48875C12.6856 10.1111 12.3529 10.9439 11.9053 11.1839C12.1321 12.6206 11.3869 13.1146 10.3409 13.1246C10.2504 13.1255 9.32247 13.1246 9.22731 13.1246C7.23316 13.1246 5.54296 12.011 4.37503 12.011V6.44287C5.40611 6.44287 6.35212 4.58516 7.27847 3.65879C8.11368 2.82357 7.83527 1.43153 8.3921 0.874727C9.78414 0.874727 9.78414 1.84589 9.78414 2.54518C9.78414 3.69879 8.94893 4.21561 8.94893 5.32924H12.0114C12.6329 5.32924 13.1223 5.88607 13.125 6.44287C13.1277 6.99967 12.9062 7.4375 12.4692 7.5565ZM2.84375 11.8125C2.84375 12.1749 2.54994 12.4688 2.1875 12.4688C1.82506 12.4688 1.53125 12.1749 1.53125 11.8125C1.53125 11.4501 1.82506 11.1562 2.1875 11.1562C2.54994 11.1562 2.84375 11.4501 2.84375 11.8125Z" /></svg></span><span className="thumb-title">Helpful</span>
                        </div>
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M0.419563 6.18835C0.148122 6.54038 6.11959e-07 7 5.62878e-07 7.56142C2.81294e-05 8.59157 0.876996 9.54578 1.98863 9.54578L3.90679 9.54578C3.66836 10.0207 3.34091 10.6098 3.34091 11.4548C3.34089 13.0519 3.97802 14 5.60793 14C6.42811 14 6.73247 12.9632 6.88841 12.1617C6.98157 11.6829 7.06959 11.2306 7.34027 10.9599C7.98476 10.3154 8.96875 8.75 9.55987 8.43213C9.61972 8.40692 9.6962 8.38707 9.77949 8.37134C9.93735 8.60005 10.2011 8.75 10.5 8.75L13.125 8.75C13.6082 8.75 14 8.35825 14 7.875L14 0.875C14 0.391754 13.6082 -3.42482e-08 13.125 -7.64949e-08L10.5 -3.0598e-07C10.0168 -3.48226e-07 9.625 0.391754 9.625 0.875L9.625 1.11398C8.73647 1.11398 6.87184 -0.000191358 4.77272 0.00038257C4.62219 0.000300541 3.74322 -0.000438633 3.65127 0.000382472C2.03027 -1.04643e-06 1.12867 0.981667 1.18117 2.45566C0.76754 2.94038 0.564868 3.64065 0.682829 4.29056C0.342234 4.82448 0.269227 5.57763 0.419563 6.18835ZM13.125 0.875L13.125 7.875L10.5 7.875L10.5 0.875L13.125 0.875ZM1.53079 6.4435C1.09375 6.125 1.09375 4.8125 1.6841 4.51125C1.31436 3.88891 1.64713 3.05613 2.09467 2.81605C1.86791 1.37941 2.61313 0.885417 3.65906 0.875355C3.74962 0.874535 4.67753 0.875355 4.77269 0.875355C6.76684 0.875355 8.45704 1.98898 9.62497 1.98898L9.62497 7.55713C8.5939 7.55713 7.64788 9.41484 6.72153 10.3412C5.88632 11.1764 6.16473 12.5685 5.6079 13.1253C4.21586 13.1253 4.21586 12.1541 4.21586 11.4548C4.21586 10.3012 5.05107 9.78439 5.05107 8.67076L1.9886 8.67076C1.36708 8.67076 0.877707 8.11393 0.874973 7.55713C0.872266 7.00033 1.09375 6.5625 1.53079 6.4435ZM11.1563 2.1875C11.1563 1.82506 11.4501 1.53125 11.8125 1.53125C12.1749 1.53125 12.4688 1.82506 12.4688 2.1875C12.4688 2.54994 12.1749 2.84375 11.8125 2.84375C11.4501 2.84375 11.1563 2.54994 11.1563 2.1875Z" /></svg></span><span className="thumb-title">Not Helpful</span>
                        </div>
                        <div className="thank-you-feedback text-body-2">Thanks for your feedback.</div>
                      </div>
                    </li>
                    <li className="review-item review-country">
                      <div className="user-profile-image">
                        <label className="profile-pict" htmlFor="profile_image" style={{ width: '32px', height: '32px', fontSize: '1em' }}><span className="missing-profile-image flex-center">h</span>
                        </label>
                      </div>
                      <header>
                        <div className="reviewer-details">
                          <h5>helenchambers</h5><small className="review-rating"><span className="review-star rate-10 show-one" /><span className="total-rating-out-five">5</span></small>
                        </div>
                        <div className="country">
                          <img className="country-flag" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png" alt="1f1ec-1f1e7.png" />
                          <div className="country-name font-accent">United Kingdom</div>
                        </div>
                      </header>
                      <div className="review-description">
                        <p className="text-body-2">Suryabella is a skilled writer, with a natural strength in wellbeing content. The blogs she has written for me are brilliant- the content is creative and engaging and she has achieved the perfect warm and uplifting, tone of voice for me. Will definitely work with her again.</p>
                      </div><span className="summarize"><time className="text-body-2">Published 1 month ago</time></span>
                      <div className="helpful-thumbs">
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.5804 7.81165C13.8519 7.45962 14 7 14 6.43858C14 5.40843 13.123 4.45422 12.0114 4.45422H10.0932C10.3316 3.97931 10.6591 3.39024 10.6591 2.54516C10.6591 0.948063 10.022 0 8.39207 0C7.57189 0 7.26753 1.03682 7.11159 1.83827C7.01843 2.31708 6.93041 2.76938 6.65973 3.04005C6.01524 3.68457 5.03125 5.25 4.44013 5.56787C4.38028 5.59308 4.3038 5.61293 4.22051 5.62866C4.06265 5.39995 3.79889 5.25 3.5 5.25H0.875C0.391754 5.25 0 5.64175 0 6.125V13.125C0 13.6082 0.391754 14 0.875 14H3.5C3.98325 14 4.375 13.6082 4.375 13.125V12.886C5.26354 12.886 7.12816 14.0002 9.22728 13.9996C9.37781 13.9997 10.2568 14.0004 10.3487 13.9996C11.9697 14 12.8713 13.0183 12.8188 11.5443C13.2325 11.0596 13.4351 10.3593 13.3172 9.70944C13.6578 9.17552 13.7308 8.42237 13.5804 7.81165ZM0.875 13.125V6.125H3.5V13.125H0.875ZM12.4692 7.5565C12.9062 7.875 12.9062 9.1875 12.3159 9.48875C12.6856 10.1111 12.3529 10.9439 11.9053 11.1839C12.1321 12.6206 11.3869 13.1146 10.3409 13.1246C10.2504 13.1255 9.32247 13.1246 9.22731 13.1246C7.23316 13.1246 5.54296 12.011 4.37503 12.011V6.44287C5.40611 6.44287 6.35212 4.58516 7.27847 3.65879C8.11368 2.82357 7.83527 1.43153 8.3921 0.874727C9.78414 0.874727 9.78414 1.84589 9.78414 2.54518C9.78414 3.69879 8.94893 4.21561 8.94893 5.32924H12.0114C12.6329 5.32924 13.1223 5.88607 13.125 6.44287C13.1277 6.99967 12.9062 7.4375 12.4692 7.5565ZM2.84375 11.8125C2.84375 12.1749 2.54994 12.4688 2.1875 12.4688C1.82506 12.4688 1.53125 12.1749 1.53125 11.8125C1.53125 11.4501 1.82506 11.1562 2.1875 11.1562C2.54994 11.1562 2.84375 11.4501 2.84375 11.8125Z" /></svg></span><span className="thumb-title">Helpful</span>
                        </div>
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M0.419563 6.18835C0.148122 6.54038 6.11959e-07 7 5.62878e-07 7.56142C2.81294e-05 8.59157 0.876996 9.54578 1.98863 9.54578L3.90679 9.54578C3.66836 10.0207 3.34091 10.6098 3.34091 11.4548C3.34089 13.0519 3.97802 14 5.60793 14C6.42811 14 6.73247 12.9632 6.88841 12.1617C6.98157 11.6829 7.06959 11.2306 7.34027 10.9599C7.98476 10.3154 8.96875 8.75 9.55987 8.43213C9.61972 8.40692 9.6962 8.38707 9.77949 8.37134C9.93735 8.60005 10.2011 8.75 10.5 8.75L13.125 8.75C13.6082 8.75 14 8.35825 14 7.875L14 0.875C14 0.391754 13.6082 -3.42482e-08 13.125 -7.64949e-08L10.5 -3.0598e-07C10.0168 -3.48226e-07 9.625 0.391754 9.625 0.875L9.625 1.11398C8.73647 1.11398 6.87184 -0.000191358 4.77272 0.00038257C4.62219 0.000300541 3.74322 -0.000438633 3.65127 0.000382472C2.03027 -1.04643e-06 1.12867 0.981667 1.18117 2.45566C0.76754 2.94038 0.564868 3.64065 0.682829 4.29056C0.342234 4.82448 0.269227 5.57763 0.419563 6.18835ZM13.125 0.875L13.125 7.875L10.5 7.875L10.5 0.875L13.125 0.875ZM1.53079 6.4435C1.09375 6.125 1.09375 4.8125 1.6841 4.51125C1.31436 3.88891 1.64713 3.05613 2.09467 2.81605C1.86791 1.37941 2.61313 0.885417 3.65906 0.875355C3.74962 0.874535 4.67753 0.875355 4.77269 0.875355C6.76684 0.875355 8.45704 1.98898 9.62497 1.98898L9.62497 7.55713C8.5939 7.55713 7.64788 9.41484 6.72153 10.3412C5.88632 11.1764 6.16473 12.5685 5.6079 13.1253C4.21586 13.1253 4.21586 12.1541 4.21586 11.4548C4.21586 10.3012 5.05107 9.78439 5.05107 8.67076L1.9886 8.67076C1.36708 8.67076 0.877707 8.11393 0.874973 7.55713C0.872266 7.00033 1.09375 6.5625 1.53079 6.4435ZM11.1563 2.1875C11.1563 1.82506 11.4501 1.53125 11.8125 1.53125C12.1749 1.53125 12.4688 1.82506 12.4688 2.1875C12.4688 2.54994 12.1749 2.84375 11.8125 2.84375C11.4501 2.84375 11.1563 2.54994 11.1563 2.1875Z" /></svg></span><span className="thumb-title">Not Helpful</span>
                        </div>
                        <div className="thank-you-feedback text-body-2">Thanks for your feedback.</div>
                      </div>
                    </li>
                    <li className="review-item review-country">
                      <div className="user-profile-image">
                        <label className="profile-pict" htmlFor="profile_image" style={{ width: '32px', height: '32px', fontSize: '1em' }}>
                          <img src="https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/6cae95f4db58cd48c75e9880c5425776-1593489838865/0fb568fa-1f20-457f-986f-7bae1bce91eb.jpg" className="profile-pict-img" alt="flyersgirl" />
                        </label>
                      </div>
                      <header>
                        <div className="reviewer-details">
                          <h5>flyersgirl</h5><small className="review-rating"><span className="review-star rate-10 show-one" /><span className="total-rating-out-five">5</span></small>
                        </div>
                        <div className="country">
                          <img className="country-flag" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png" alt="1f1fa-1f1f8.png" />
                          <div className="country-name font-accent">United States</div>
                        </div>
                      </header>
                      <div className="review-description">
                        <p className="text-body-2">thanks so much for your great work!</p>
                      </div><span className="summarize"><time className="text-body-2">Published 3 days ago</time></span>
                      <div className="helpful-thumbs">
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.5804 7.81165C13.8519 7.45962 14 7 14 6.43858C14 5.40843 13.123 4.45422 12.0114 4.45422H10.0932C10.3316 3.97931 10.6591 3.39024 10.6591 2.54516C10.6591 0.948063 10.022 0 8.39207 0C7.57189 0 7.26753 1.03682 7.11159 1.83827C7.01843 2.31708 6.93041 2.76938 6.65973 3.04005C6.01524 3.68457 5.03125 5.25 4.44013 5.56787C4.38028 5.59308 4.3038 5.61293 4.22051 5.62866C4.06265 5.39995 3.79889 5.25 3.5 5.25H0.875C0.391754 5.25 0 5.64175 0 6.125V13.125C0 13.6082 0.391754 14 0.875 14H3.5C3.98325 14 4.375 13.6082 4.375 13.125V12.886C5.26354 12.886 7.12816 14.0002 9.22728 13.9996C9.37781 13.9997 10.2568 14.0004 10.3487 13.9996C11.9697 14 12.8713 13.0183 12.8188 11.5443C13.2325 11.0596 13.4351 10.3593 13.3172 9.70944C13.6578 9.17552 13.7308 8.42237 13.5804 7.81165ZM0.875 13.125V6.125H3.5V13.125H0.875ZM12.4692 7.5565C12.9062 7.875 12.9062 9.1875 12.3159 9.48875C12.6856 10.1111 12.3529 10.9439 11.9053 11.1839C12.1321 12.6206 11.3869 13.1146 10.3409 13.1246C10.2504 13.1255 9.32247 13.1246 9.22731 13.1246C7.23316 13.1246 5.54296 12.011 4.37503 12.011V6.44287C5.40611 6.44287 6.35212 4.58516 7.27847 3.65879C8.11368 2.82357 7.83527 1.43153 8.3921 0.874727C9.78414 0.874727 9.78414 1.84589 9.78414 2.54518C9.78414 3.69879 8.94893 4.21561 8.94893 5.32924H12.0114C12.6329 5.32924 13.1223 5.88607 13.125 6.44287C13.1277 6.99967 12.9062 7.4375 12.4692 7.5565ZM2.84375 11.8125C2.84375 12.1749 2.54994 12.4688 2.1875 12.4688C1.82506 12.4688 1.53125 12.1749 1.53125 11.8125C1.53125 11.4501 1.82506 11.1562 2.1875 11.1562C2.54994 11.1562 2.84375 11.4501 2.84375 11.8125Z" /></svg></span><span className="thumb-title">Helpful</span>
                        </div>
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M0.419563 6.18835C0.148122 6.54038 6.11959e-07 7 5.62878e-07 7.56142C2.81294e-05 8.59157 0.876996 9.54578 1.98863 9.54578L3.90679 9.54578C3.66836 10.0207 3.34091 10.6098 3.34091 11.4548C3.34089 13.0519 3.97802 14 5.60793 14C6.42811 14 6.73247 12.9632 6.88841 12.1617C6.98157 11.6829 7.06959 11.2306 7.34027 10.9599C7.98476 10.3154 8.96875 8.75 9.55987 8.43213C9.61972 8.40692 9.6962 8.38707 9.77949 8.37134C9.93735 8.60005 10.2011 8.75 10.5 8.75L13.125 8.75C13.6082 8.75 14 8.35825 14 7.875L14 0.875C14 0.391754 13.6082 -3.42482e-08 13.125 -7.64949e-08L10.5 -3.0598e-07C10.0168 -3.48226e-07 9.625 0.391754 9.625 0.875L9.625 1.11398C8.73647 1.11398 6.87184 -0.000191358 4.77272 0.00038257C4.62219 0.000300541 3.74322 -0.000438633 3.65127 0.000382472C2.03027 -1.04643e-06 1.12867 0.981667 1.18117 2.45566C0.76754 2.94038 0.564868 3.64065 0.682829 4.29056C0.342234 4.82448 0.269227 5.57763 0.419563 6.18835ZM13.125 0.875L13.125 7.875L10.5 7.875L10.5 0.875L13.125 0.875ZM1.53079 6.4435C1.09375 6.125 1.09375 4.8125 1.6841 4.51125C1.31436 3.88891 1.64713 3.05613 2.09467 2.81605C1.86791 1.37941 2.61313 0.885417 3.65906 0.875355C3.74962 0.874535 4.67753 0.875355 4.77269 0.875355C6.76684 0.875355 8.45704 1.98898 9.62497 1.98898L9.62497 7.55713C8.5939 7.55713 7.64788 9.41484 6.72153 10.3412C5.88632 11.1764 6.16473 12.5685 5.6079 13.1253C4.21586 13.1253 4.21586 12.1541 4.21586 11.4548C4.21586 10.3012 5.05107 9.78439 5.05107 8.67076L1.9886 8.67076C1.36708 8.67076 0.877707 8.11393 0.874973 7.55713C0.872266 7.00033 1.09375 6.5625 1.53079 6.4435ZM11.1563 2.1875C11.1563 1.82506 11.4501 1.53125 11.8125 1.53125C12.1749 1.53125 12.4688 1.82506 12.4688 2.1875C12.4688 2.54994 12.1749 2.84375 11.8125 2.84375C11.4501 2.84375 11.1563 2.54994 11.1563 2.1875Z" /></svg></span><span className="thumb-title">Not Helpful</span>
                        </div>
                        <div className="thank-you-feedback text-body-2">Thanks for your feedback.</div>
                      </div>
                    </li>
                    <li className="review-item review-country">
                      <div className="user-profile-image">
                        <label className="profile-pict" htmlFor="profile_image" style={{ width: '32px', height: '32px', fontSize: '1em' }}><span className="missing-profile-image flex-center">a</span>
                        </label>
                      </div>
                      <header>
                        <div className="reviewer-details">
                          <h5>anilgunjal</h5><small className="review-rating"><span className="review-star rate-10 show-one" /><span className="total-rating-out-five">5</span></small>
                        </div>
                        <div className="country">
                          <img className="country-flag" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png" alt="1f1fa-1f1f8.png" />
                          <div className="country-name font-accent">United States</div>
                        </div>
                      </header>
                      <div className="review-description">
                        <p className="text-body-2">Great to work with. Excellent work and communication</p>
                      </div><span className="summarize"><time className="text-body-2">Published 5 days ago</time></span>
                      <div className="helpful-thumbs">
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.5804 7.81165C13.8519 7.45962 14 7 14 6.43858C14 5.40843 13.123 4.45422 12.0114 4.45422H10.0932C10.3316 3.97931 10.6591 3.39024 10.6591 2.54516C10.6591 0.948063 10.022 0 8.39207 0C7.57189 0 7.26753 1.03682 7.11159 1.83827C7.01843 2.31708 6.93041 2.76938 6.65973 3.04005C6.01524 3.68457 5.03125 5.25 4.44013 5.56787C4.38028 5.59308 4.3038 5.61293 4.22051 5.62866C4.06265 5.39995 3.79889 5.25 3.5 5.25H0.875C0.391754 5.25 0 5.64175 0 6.125V13.125C0 13.6082 0.391754 14 0.875 14H3.5C3.98325 14 4.375 13.6082 4.375 13.125V12.886C5.26354 12.886 7.12816 14.0002 9.22728 13.9996C9.37781 13.9997 10.2568 14.0004 10.3487 13.9996C11.9697 14 12.8713 13.0183 12.8188 11.5443C13.2325 11.0596 13.4351 10.3593 13.3172 9.70944C13.6578 9.17552 13.7308 8.42237 13.5804 7.81165ZM0.875 13.125V6.125H3.5V13.125H0.875ZM12.4692 7.5565C12.9062 7.875 12.9062 9.1875 12.3159 9.48875C12.6856 10.1111 12.3529 10.9439 11.9053 11.1839C12.1321 12.6206 11.3869 13.1146 10.3409 13.1246C10.2504 13.1255 9.32247 13.1246 9.22731 13.1246C7.23316 13.1246 5.54296 12.011 4.37503 12.011V6.44287C5.40611 6.44287 6.35212 4.58516 7.27847 3.65879C8.11368 2.82357 7.83527 1.43153 8.3921 0.874727C9.78414 0.874727 9.78414 1.84589 9.78414 2.54518C9.78414 3.69879 8.94893 4.21561 8.94893 5.32924H12.0114C12.6329 5.32924 13.1223 5.88607 13.125 6.44287C13.1277 6.99967 12.9062 7.4375 12.4692 7.5565ZM2.84375 11.8125C2.84375 12.1749 2.54994 12.4688 2.1875 12.4688C1.82506 12.4688 1.53125 12.1749 1.53125 11.8125C1.53125 11.4501 1.82506 11.1562 2.1875 11.1562C2.54994 11.1562 2.84375 11.4501 2.84375 11.8125Z" /></svg></span><span className="thumb-title">Helpful</span>
                        </div>
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M0.419563 6.18835C0.148122 6.54038 6.11959e-07 7 5.62878e-07 7.56142C2.81294e-05 8.59157 0.876996 9.54578 1.98863 9.54578L3.90679 9.54578C3.66836 10.0207 3.34091 10.6098 3.34091 11.4548C3.34089 13.0519 3.97802 14 5.60793 14C6.42811 14 6.73247 12.9632 6.88841 12.1617C6.98157 11.6829 7.06959 11.2306 7.34027 10.9599C7.98476 10.3154 8.96875 8.75 9.55987 8.43213C9.61972 8.40692 9.6962 8.38707 9.77949 8.37134C9.93735 8.60005 10.2011 8.75 10.5 8.75L13.125 8.75C13.6082 8.75 14 8.35825 14 7.875L14 0.875C14 0.391754 13.6082 -3.42482e-08 13.125 -7.64949e-08L10.5 -3.0598e-07C10.0168 -3.48226e-07 9.625 0.391754 9.625 0.875L9.625 1.11398C8.73647 1.11398 6.87184 -0.000191358 4.77272 0.00038257C4.62219 0.000300541 3.74322 -0.000438633 3.65127 0.000382472C2.03027 -1.04643e-06 1.12867 0.981667 1.18117 2.45566C0.76754 2.94038 0.564868 3.64065 0.682829 4.29056C0.342234 4.82448 0.269227 5.57763 0.419563 6.18835ZM13.125 0.875L13.125 7.875L10.5 7.875L10.5 0.875L13.125 0.875ZM1.53079 6.4435C1.09375 6.125 1.09375 4.8125 1.6841 4.51125C1.31436 3.88891 1.64713 3.05613 2.09467 2.81605C1.86791 1.37941 2.61313 0.885417 3.65906 0.875355C3.74962 0.874535 4.67753 0.875355 4.77269 0.875355C6.76684 0.875355 8.45704 1.98898 9.62497 1.98898L9.62497 7.55713C8.5939 7.55713 7.64788 9.41484 6.72153 10.3412C5.88632 11.1764 6.16473 12.5685 5.6079 13.1253C4.21586 13.1253 4.21586 12.1541 4.21586 11.4548C4.21586 10.3012 5.05107 9.78439 5.05107 8.67076L1.9886 8.67076C1.36708 8.67076 0.877707 8.11393 0.874973 7.55713C0.872266 7.00033 1.09375 6.5625 1.53079 6.4435ZM11.1563 2.1875C11.1563 1.82506 11.4501 1.53125 11.8125 1.53125C12.1749 1.53125 12.4688 1.82506 12.4688 2.1875C12.4688 2.54994 12.1749 2.84375 11.8125 2.84375C11.4501 2.84375 11.1563 2.54994 11.1563 2.1875Z" /></svg></span><span className="thumb-title">Not Helpful</span>
                        </div>
                        <div className="thank-you-feedback text-body-2">Thanks for your feedback.</div>
                      </div>
                    </li>
                    <li className="review-item review-country">
                      <div className="user-profile-image">
                        <label className="profile-pict" htmlFor="profile_image" style={{ width: '32px', height: '32px', fontSize: '1em' }}><span className="missing-profile-image flex-center">a</span>
                        </label>
                      </div>
                      <header>
                        <div className="reviewer-details">
                          <h5>annavas390</h5><small className="review-rating"><span className="review-star rate-10 show-one" /><span className="total-rating-out-five">5</span></small>
                        </div>
                        <div className="country">
                          <img className="country-flag" src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png" alt="1f1ec-1f1e7.png" />
                          <div className="country-name font-accent">United Kingdom</div>
                        </div>
                      </header>
                      <div className="review-description">
                        <p className="text-body-2">Very quickly done :)</p>
                      </div><span className="summarize"><time className="text-body-2">Published 1 week ago</time></span>
                      <div className="helpful-thumbs">
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.5804 7.81165C13.8519 7.45962 14 7 14 6.43858C14 5.40843 13.123 4.45422 12.0114 4.45422H10.0932C10.3316 3.97931 10.6591 3.39024 10.6591 2.54516C10.6591 0.948063 10.022 0 8.39207 0C7.57189 0 7.26753 1.03682 7.11159 1.83827C7.01843 2.31708 6.93041 2.76938 6.65973 3.04005C6.01524 3.68457 5.03125 5.25 4.44013 5.56787C4.38028 5.59308 4.3038 5.61293 4.22051 5.62866C4.06265 5.39995 3.79889 5.25 3.5 5.25H0.875C0.391754 5.25 0 5.64175 0 6.125V13.125C0 13.6082 0.391754 14 0.875 14H3.5C3.98325 14 4.375 13.6082 4.375 13.125V12.886C5.26354 12.886 7.12816 14.0002 9.22728 13.9996C9.37781 13.9997 10.2568 14.0004 10.3487 13.9996C11.9697 14 12.8713 13.0183 12.8188 11.5443C13.2325 11.0596 13.4351 10.3593 13.3172 9.70944C13.6578 9.17552 13.7308 8.42237 13.5804 7.81165ZM0.875 13.125V6.125H3.5V13.125H0.875ZM12.4692 7.5565C12.9062 7.875 12.9062 9.1875 12.3159 9.48875C12.6856 10.1111 12.3529 10.9439 11.9053 11.1839C12.1321 12.6206 11.3869 13.1146 10.3409 13.1246C10.2504 13.1255 9.32247 13.1246 9.22731 13.1246C7.23316 13.1246 5.54296 12.011 4.37503 12.011V6.44287C5.40611 6.44287 6.35212 4.58516 7.27847 3.65879C8.11368 2.82357 7.83527 1.43153 8.3921 0.874727C9.78414 0.874727 9.78414 1.84589 9.78414 2.54518C9.78414 3.69879 8.94893 4.21561 8.94893 5.32924H12.0114C12.6329 5.32924 13.1223 5.88607 13.125 6.44287C13.1277 6.99967 12.9062 7.4375 12.4692 7.5565ZM2.84375 11.8125C2.84375 12.1749 2.54994 12.4688 2.1875 12.4688C1.82506 12.4688 1.53125 12.1749 1.53125 11.8125C1.53125 11.4501 1.82506 11.1562 2.1875 11.1562C2.54994 11.1562 2.84375 11.4501 2.84375 11.8125Z" /></svg></span><span className="thumb-title">Helpful</span>
                        </div>
                        <div className="helpful-thumb text-body-2"><span className="fit-icon thumbs-icon" style={{ width: '14px', height: '14px' }}><svg width={14} height={14} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M0.419563 6.18835C0.148122 6.54038 6.11959e-07 7 5.62878e-07 7.56142C2.81294e-05 8.59157 0.876996 9.54578 1.98863 9.54578L3.90679 9.54578C3.66836 10.0207 3.34091 10.6098 3.34091 11.4548C3.34089 13.0519 3.97802 14 5.60793 14C6.42811 14 6.73247 12.9632 6.88841 12.1617C6.98157 11.6829 7.06959 11.2306 7.34027 10.9599C7.98476 10.3154 8.96875 8.75 9.55987 8.43213C9.61972 8.40692 9.6962 8.38707 9.77949 8.37134C9.93735 8.60005 10.2011 8.75 10.5 8.75L13.125 8.75C13.6082 8.75 14 8.35825 14 7.875L14 0.875C14 0.391754 13.6082 -3.42482e-08 13.125 -7.64949e-08L10.5 -3.0598e-07C10.0168 -3.48226e-07 9.625 0.391754 9.625 0.875L9.625 1.11398C8.73647 1.11398 6.87184 -0.000191358 4.77272 0.00038257C4.62219 0.000300541 3.74322 -0.000438633 3.65127 0.000382472C2.03027 -1.04643e-06 1.12867 0.981667 1.18117 2.45566C0.76754 2.94038 0.564868 3.64065 0.682829 4.29056C0.342234 4.82448 0.269227 5.57763 0.419563 6.18835ZM13.125 0.875L13.125 7.875L10.5 7.875L10.5 0.875L13.125 0.875ZM1.53079 6.4435C1.09375 6.125 1.09375 4.8125 1.6841 4.51125C1.31436 3.88891 1.64713 3.05613 2.09467 2.81605C1.86791 1.37941 2.61313 0.885417 3.65906 0.875355C3.74962 0.874535 4.67753 0.875355 4.77269 0.875355C6.76684 0.875355 8.45704 1.98898 9.62497 1.98898L9.62497 7.55713C8.5939 7.55713 7.64788 9.41484 6.72153 10.3412C5.88632 11.1764 6.16473 12.5685 5.6079 13.1253C4.21586 13.1253 4.21586 12.1541 4.21586 11.4548C4.21586 10.3012 5.05107 9.78439 5.05107 8.67076L1.9886 8.67076C1.36708 8.67076 0.877707 8.11393 0.874973 7.55713C0.872266 7.00033 1.09375 6.5625 1.53079 6.4435ZM11.1563 2.1875C11.1563 1.82506 11.4501 1.53125 11.8125 1.53125C12.1749 1.53125 12.4688 1.82506 12.4688 2.1875C12.4688 2.54994 12.1749 2.84375 11.8125 2.84375C11.4501 2.84375 11.1563 2.54994 11.1563 2.1875Z" /></svg></span><span className="thumb-title">Not Helpful</span>
                        </div>
                        <div className="thank-you-feedback text-body-2">Thanks for your feedback.</div>
                      </div>
                    </li>
                  </ul>
                  <div className="load-more-wrapper">
                    <button>+ See More</button>
                  </div>
                </div>
              </div>
              <div className="gig-tags-container">
                <h2 className="section-title">Related Tags</h2>
                <ul>
                  <li><a href="/gigs/spirituality">spirituality</a>
                  </li>
                  <li><a href="/gigs/wellbeing">wellbeing</a>
                  </li>
                  <li><a href="/gigs/wellness">wellness</a>
                  </li>
                  <li><a href="/gigs/yoga">yoga</a>
                  </li>
                  <li><a href="/gigs/self-help">self help</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscribe;
