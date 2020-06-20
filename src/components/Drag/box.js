/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useDrag } from 'react-dnd'
import PropTypes from "prop-types";
import { Popconfirm } from 'antd';

import "./drag.scss";

export default function Box(props) {
  const { className = "", item, onClick, onConfirm, onEdit } = props
  const [, drag] = useDrag({ item: { ...item, type: 'box' } })
  return (

    <div data-toggle="tooltip" data-placement="top" title={item.fullName || 'N/A'} ref={drag} className={`media ${className}`} >
      <div onClick={() => { if (onClick) { onClick() } }} className="media-left">
        <a href="#">
          <img className="media-object" src={(item.type === 'image/png' || item.type === 'image/jpeg' || item.type === 'image/jpg') ? item.link : "https://i.ibb.co/d5pWRyG/file-img.png"} width={35} height={35} alt="" />
        </a>
      </div>
      <div className="media-body">
        <div className="drag__box">
          <small onClick={() => { if (onClick) { onClick() } }} className="media-heading drag__box__name">{item.name}</small>
          <div className="drag__box__action">
            <div onClick={() => {
              onEdit(item)
            }}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
            <Popconfirm
              title="Are you sure delete this item?"
              onConfirm={() => { onConfirm(item) }}
              okText="Yes"
              cancelText="No"
            >
              <div>
                <i class="fa fa-trash" aria-hidden="true"></i>
              </div>
            </Popconfirm>

          </div>
        </div>
      </div>
    </div>
  )
}
Box.propTypes = {
  className: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
