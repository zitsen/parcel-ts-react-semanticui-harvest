import React from 'react'
import { Card, Container, Header, Image } from 'semantic-ui-react'
import _ from 'lodash'
import { useHistory, Link } from "react-router-dom";

import { HarvestButton } from './button'
import HarvestSegment from './segment'

import * as Icons from './icons'

import './earn.less'


interface PoolObject {
    id: string,
    displayName?: string,
    tokenForLogo?: string,
    state?: number,
    rewardAPY?: number,
    rewardTokenSymbols?: string,
    collateralTokenSymbols?: string,
};

const Logo = ({ tokenForLogo }) => {
    if (tokenForLogo === 'FARM') {
        return '🚜'
    } else if (tokenForLogo === 'BPT') {
        return '⚖️'
    } else if (_.has(Icons, tokenForLogo)) {
        return <Image avatar size='mini' verticalAlign='bottom' src={Icons[tokenForLogo]} />
    } else {
        return tokenForLogo
    }
}

const isPoolActive = (pool: PoolObject) => pool.state === 0

const PoolButton = ({ apy, id, active, ...props }) => {
    const history = useHistory();
    const routeChange = () => {
        let path = `/pool/${id}`;
        history.push(path);
    }
    return <HarvestButton id={id} {...props} onClick={routeChange}>{active ? `${apy}% APY` : 'Withdraw'}</HarvestButton>
}

const Pool = ({ pool, ...props }) => (
    <Card {...props} id={pool.id} ><Card.Content textAlign="center">
        <Card.Header as='h3'><Logo {...pool} />{pool.displayName}</Card.Header>
        <Card.Meta as='div'><div>Deposit: <b>{pool.collateralTokenSymbols}</b></div>
            <div>Earn: <b>{pool.collateralTokenSymbols}</b></div></Card.Meta>
        <Card.Description as={PoolButton} active={isPoolActive(pool)} apy={pool.rewardAPY} id={pool.id}>

        </Card.Description>
    </Card.Content></Card>
)

export const Pools = ({ pools }) => {
    return <Card.Group itemsPerRow={3}>{_.map(pools, (pool) => <Pool key={pool.id} pool={pool} />)}</Card.Group>
}

export const ActivePools = ({ pools }) => (<Pools pools={_.filter(pools, (pool) => isPoolActive(pool))}></Pools>)
export const InactivePools = ({ pools }) => (<Pools pools={_.filter(pools, (pool) => !isPoolActive(pool))}></Pools>)

const pools = [{ id: 'dai', displayName: 'DAI FARM', tokenForLogo: 'DAI', state: 0, rewardAPY: 0.8718, collateralTokenSymbols: 'fDAI' },
{ id: 'dai', displayName: 'DAI', tokenForLogo: 'DAI', state: 1, rewardAPY: 0.8718, collateralTokenSymbols: 'fDAI' }]


import fetchPools from './mock'

function earnReducer(state, action) {
    const { type, ...props } = action
    switch (type) {
        case 'LOADING':
            return { ...state, loading: true, ...props }
        case 'FINISH':
            return { ...state, loading: false, ...props }
        default:
            throw new Error()
    }
}


export const Earn = () => {
    const [state, setState] = React.useReducer(earnReducer, { pools: [], loading: true });
    React.useEffect(() => {
        // Should fetch data from API.
        // Here just just mock client data.
        const pullPools = async () => {
            let pools = await fetchPools()
            setState({ type: 'FINISH', pools })
        }
        if (_.isEmpty(state.pools)) {
            pullPools()
        }
    })
    return <Container>
        <Header as='h2' textAlign='center'>Earn 🚜 FARM with Harvest</Header>
        <HarvestSegment><span style={{ paddingRight: '20px', fontWeight: 'bold' }}>You haven't connected a wallet.</span> <HarvestButton style={{ width: '160px' }} >Connect Wallet</HarvestButton></HarvestSegment>
        <Header as='h3' textAlign='center'>Stake your LP tokens for rewards</Header>
        <ActivePools loading={state.loading} pools={state.pools}></ActivePools>
        <HarvestSegment><b>Uniswap LPs</b>
            <span style={{ padding: '0px 5px 0px 5px' }}> have moved to the </span>
            <Link to="/breadtothepeople">Stake</Link>
            <span style={{ padding: '0px 5px 0px 5px' }}>page</span></HarvestSegment>
        <Header as='h3' textAlign='center'>🧑‍🌾 Inactive Pools, Withdraw Your Vegetables!‍ 🧑‍🌾</Header>
        <InactivePools loading={state.loading} pools={state.pools}></InactivePools>
    </Container>
}

export default Earn