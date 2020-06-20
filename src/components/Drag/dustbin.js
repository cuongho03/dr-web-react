import React, { useState } from 'react'
import { useDrop } from 'react-dnd'
import PropTypes from "prop-types";

export default function Dustbin(props) {
  const { greedy = false, children, className = "", onChange } = props;
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: 'box',
    drop(item, monitor) {

      const didDrop = monitor.didDrop()
      // if (didDrop && !greedy) {
      //   return
      // }
      setHasDropped(true)
      setHasDroppedOnChild(didDrop)
      if (onChange) {
        onChange(item)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  let backgroundColor = ''

  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = 'drag__hover'
  }

  return (
    <div ref={drop} className={`drag__dustbin ${className} ${backgroundColor}`} >
      {/* <br /> */}
      {/* {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>} */}

      <div>{children}</div>
    </div>
  )

}

Dustbin.propTypes = {
  className: PropTypes.string,
  greedy: PropTypes.bool,
  hasDropped: PropTypes.bool,
  hasDroppedOnChild: PropTypes.bool,
  onChange: PropTypes.func
};
