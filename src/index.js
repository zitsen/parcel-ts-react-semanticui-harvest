import * as React from 'react'
import _ from 'lodash'
import { useDebouncedCallback } from 'use-debounce'
import { Header, Input, Table, Container, Item, Checkbox, Segment, Modal, Button, Icon } from 'semantic-ui-react'

import './semantic-ui/semantic.less'

import fetchProducts from './mock'

function reducer(state, action) {
  const { type, ...props } = action
  switch (type) {
    case 'RESET':
      return { ...state, ...props }
    case 'START_SEARCH':
      return { ...state, loading: true, query: action.query, reset: false }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, ...props, reset: false }
    case 'TOGGLE_INSTOCK':
      return { ...state, inStockOnly: action.inStockOnly, reset: false }
    case 'FINISH_FETCH':
      return { ...state, products: action.products, reset: true }
    default:
      throw new Error()
  }
}

const ProductDetail = ({ product }) => {
  const [open, setOpen] = React.useState(false)
  return <React.Fragment>
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button size="tiny">View detail</Button>}
    >
      <Header icon>
        {product.name}
      </Header>
      <Modal.Content>
      </Modal.Content>
    </Modal>
  </React.Fragment>
}
const ProductsWithCategory = ({ category, products }) => {

  return <Item>
    <Item.Content>
      <Item.Header size="small">{category}</Item.Header>
      <Item.Description>
        <Table columns={3} compact basic="very" unstackable>
          <Table.Body>
            {_.map(products, (product) => <Table.Row key={product.name}>
              <Table.Cell style={product.inStock ? null : { color: 'red' }}>{product.name}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell><ProductDetail product={product} /></Table.Cell>
            </Table.Row>)}
          </Table.Body>
        </Table>
      </Item.Description>
    </Item.Content>
  </Item>
}

const ProductsItemGroup = ({ products }) => {
  if (_.size(products) == 0) {
    return <Segment><b>No products found.</b></Segment>
  }
  return <Item.Group>
    {_(products).groupBy('category').map((v, k) => <ProductsWithCategory key={k} category={k} products={v} />).value()}
  </Item.Group>
}

const Products = ({ products, query }) => {
  const [state, setState] = React.useReducer(reducer, { products, results: [], query });

  // real search function
  const search = ({ query, inStockOnly }) => {
    const re = new RegExp(_.escapeRegExp(query), 'i')
    const isMatch = (product) => {
      let match = re.test(product.name)
      if (!match) return false
      if (inStockOnly) {
        return product.inStock;
      } else {
        return match;
      }
    }
    const results = _.filter(state.products, isMatch)
    setState({ type: "FINISH_SEARCH", results, query, inStockOnly })
  };
  // debounced search callback
  const [handleSearchChange] = useDebouncedCallback(search, 200)

  React.useEffect(() => {
    // Should fetch data from API.
    // Here just just mock client data.
    if (!state.products) {
      fetchProducts()
        .then(res => setState({ type: 'FINISH_FETCH', products: res }))
    }
  })

  return <Container>
    <Header size="huge">Products</Header>
    <Input
      loading={state.loading}
      icon="search"
      placeholder='Search...'
      value={query}
      onChange={(e, data) => {
        //if (data.value) {
        setState({ type: "START_SEARCH", query: data.value })
        handleSearchChange({ query: data.value, inStockOnly: state.inStockOnly })
        // } else {
        //   setState({ type: "RESET", query: data.value, inStockOnly: state.inStockOnly })
        // }
      }} />
    <Checkbox
      style={{ margin: '1em', display: 'block'}}
      label='In stock products only'
      checked={state.inStockOnly}
      onChange={(e, data) => {
        setState({ type: "TOGGLE_INSTOCK", inStockOnly: data.checked })
        search({ query: state.query, inStockOnly: data.checked })
      }} />
    <ProductsItemGroup
      products={state.reset ? state.products : state.results}
      loading={state.loading}></ProductsItemGroup>
  </Container>
}

export default Products