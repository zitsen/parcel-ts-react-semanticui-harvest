import React from 'react'
import { Button, ButtonProps } from 'semantic-ui-react'

import './button.less'

export const HarvestButton = (props: ButtonProps) => (<button {...props} className='harvest' />)

export default HarvestButton
