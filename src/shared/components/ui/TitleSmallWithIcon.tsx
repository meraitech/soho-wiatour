import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type Props = {
  text: string
  icon: IconDefinition
}

export const TitleSmallWithIcon = ({ text, icon }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 p-2 rounded flex items-center justify-center aspect-square bg-accent">
        <FontAwesomeIcon icon={icon} />
      </div>
      <span>{text}</span>
    </div>
  )
}
