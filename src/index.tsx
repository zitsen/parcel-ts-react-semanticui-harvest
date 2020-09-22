import React, { useState } from 'react'
import _ from 'lodash'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'

import './index.less'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom"

import Home from './home'
import Earn from './earn'
import Stake from './stake'
import PoolPage from './pool'

import './sticky.less'
import './container.less'
import './menu.less'

import tractorImage from '../assets/images/tractor.png'

const HarvestFarm = () => {
  let match = useRouteMatch("/:item");
  const [{ item }, setState] = useState({ item: _.get(match, 'url') || '/' });
  const itemChange = (_e, { to }) => setState({ item: to })
  return <Container textAlign='center' className="harvest" style={{ maxWidth: '750px !important', margin: '0px auto 40px' }}>
    <div className='harvest rail'>
      <Image src={tractorImage} width='50px' verticalAlign='middle' />Harvest
</div>
    <Menu className='harvest' text fluid widths={7}>
      <Menu.Item as={Link} to="/" onClick={itemChange} active={item === '/'}>Farm</Menu.Item>
      <Menu.Item as={Link} to="/earn" onClick={itemChange} active={item === '/earn'}>Earn</Menu.Item>
      <Menu.Item as={Link} to="/breadtothepeople" onClick={itemChange} active={item === '/breadtothepeople'}>Stake</Menu.Item>
      <Menu.Item as={Link} to="/faq" onClick={itemChange} active={item === '/faq'}>FAQ</Menu.Item>
      <Menu.Item as={Link} to="/dashboard" onClick={itemChange} active={item === '/dashboard'}>👨‍🌾</Menu.Item>
      <Menu.Item as='a' target="_blank" href="//farm.chainwiki.dev/en/home">Wiki</Menu.Item>
      <Menu.Item as='a' target="_blank" href="//farm.chainwiki.dev/zh/策略">策略</Menu.Item>
    </Menu>
    <div className="havest sticky">
      <a target="_blank" href="https://twitter.com/harvest_finance">
        <Icon color='black' name='twitter' />
      </a>
      <a target="_blank" href="https://discord.gg/R5SeTVR">
        <Icon color='black' name='discord' />
      </a>
      <a target="_blank" href="https://medium.com/harvest-finance">
        <Icon color='black' name='medium' />
      </a>
      <a target="_blank" href="https://www.reddit.com/r/HarvestFinance/">
        <Icon color='black' name='reddit' />
      </a>
    </div>
    <Switch>
      <Route path="/pool/:id">
        <PoolPage />
      </Route>
      <Route exact path="/earn">
        <Earn />
      </Route>
      <Route exact path="/breadtothepeople">
        <Stake />
      </Route>
      <Route exact path="/faq">
        <Stake />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </Container>
}
export default function App() {
  return (
    <Router>
      <HarvestFarm />
    </Router>
  )
}