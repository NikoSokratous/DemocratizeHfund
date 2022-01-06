import React, { Component , useEffect }  from 'react';
import Web3 from 'web3' ;
import Identicon from 'identicon.js';
import './App.css';
import PythagorasProject from '../abis/PythagorasProject.json'
import Navbar from './Navbar'
import Main from './Main'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import uniswapLogo from '../uniswap-logo.png'
import daiLogo from '../dai-logo.png'





export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})


const DAI_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`
const clink_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const hex_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const wbtc_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const graph_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const cro_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const ftm_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const mkr_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const celsius_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const comp_QUERY = gql`
  query tokens($tokenAddress: Bytes!) {
    tokens(where: { id: $tokenAddress }) {
      derivedETH
      totalLiquidity
    }
  }
`

const ETH_PRICE_QUERY = gql`
  query bundles {
    bundles(where: { id: "1" }) {
      ethPrice
    }
  }
`

function Pinakas() {

  const { loading: ethLoading, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: daiLoading, data: daiData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }})
  const { loading: clinkLoading, data: clinkData } = useQuery(clink_QUERY, {
    variables: {
      tokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca'
    }
  })
  const { loading: hexLoading, data: hexData } = useQuery(hex_QUERY, {
    variables: {
      tokenAddress: '0x2b591e99afe9f32eaa6214f7b7629768c40eeb39'
    }
  })
  const { loading: wbtcLoading, data: wbtcData } = useQuery(wbtc_QUERY, {
    variables: {
      tokenAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
    }
  })
   const { loading: graphLoading, data: graphData } = useQuery(graph_QUERY, {
    variables: {
      tokenAddress: '0xc944e90c64b2c07662a292be6244bdf05cda44a7'
    }
  })
   const { loading: croLoading, data: croData } = useQuery(cro_QUERY, {
    variables: {
      tokenAddress: '0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b'
    }
  })
   const { loading: ftmLoading, data: ftmData } = useQuery(ftm_QUERY, {
    variables: {
      tokenAddress: '0x4e15361fd6b4bb609fa63c81a2be19d873717870'
    }
  })
   const { loading: mkrLoading, data: mkrData } = useQuery(mkr_QUERY, {
    variables: {
      tokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
    }
  })
   const { loading: celsiusLoading, data: celsiusData } = useQuery(celsius_QUERY, {
    variables: {
      tokenAddress: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d'
    }
  })
   const { loading: compLoading, data: compData } = useQuery(comp_QUERY, {
    variables: {
      tokenAddress: '0xc00e94cb662c3520282e6f5717214004a7f26888'
    }
  })

  //DAI
  const daiPriceInEth = daiData && daiData.tokens[0].derivedETH
  const daiTotalLiquidity = daiData && daiData.tokens[0].totalLiquidity
  //chainlink
  const clinkPriceInEth = clinkData && clinkData.tokens[0].derivedETH
  const clinkTotalLiquidity = clinkData && clinkData.tokens[0].totalLiquidity
  //hex
  const hexPriceInEth = hexData && hexData.tokens[0].derivedETH
  const hexTotalLiquidity = hexData && hexData.tokens[0].totalLiquidity
  //wbtc
  const wbtcPriceInEth = wbtcData && wbtcData.tokens[0].derivedETH
  const wbtcTotalLiquidity = wbtcData && wbtcData.tokens[0].totalLiquidity
  //graph
  const graphPriceInEth = graphData && graphData.tokens[0].derivedETH
  const graphTotalLiquidity = graphData && graphData.tokens[0].totalLiquidity
  //cro
  const croPriceInEth = croData && croData.tokens[0].derivedETH
  const croTotalLiquidity = croData && croData.tokens[0].totalLiquidity
  //ftm
  const ftmPriceInEth = ftmData && ftmData.tokens[0].derivedETH
  const ftmTotalLiquidity = ftmData && ftmData.tokens[0].totalLiquidity
  //maker
  const mkrPriceInEth = mkrData && mkrData.tokens[0].derivedETH
  const mkrTotalLiquidity = mkrData && mkrData.tokens[0].totalLiquidity
  //celsius
  const celsiusPriceInEth = celsiusData && celsiusData.tokens[0].derivedETH
  const celsiusTotalLiquidity = celsiusData && celsiusData.tokens[0].totalLiquidity
  //compound
  const compPriceInEth = compData && compData.tokens[0].derivedETH
  const compTotalLiquidity = compData && compData.tokens[0].totalLiquidity
  //eth
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0].ethPrice

  return (
     <div className="container1">
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-left">
            <div className="content mr-auto ml-auto">
              <div>

                <h5>
                 Price and liquidity chart
                 <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div> 
                </h5>


              <p>&nbsp;</p>
               <h5>
                  ETH price:{' '}
                  {ethLoading || daiLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  ChainLink price:{' '}
                  {ethLoading || clinkLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(clinkPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {clinkLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(clinkTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  HEX price:{' '}
                  {ethLoading || hexLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(hexPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {hexLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(hexTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  Wrapped BTC price:{' '}
                  {ethLoading || wbtcLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(wbtcPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {wbtcLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(wbtcTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  Graph token price:{' '}
                  {ethLoading || graphLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(graphPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {graphLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(graphTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  Cro token price:{' '}
                  {ethLoading || croLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(croPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {croLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(croTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  FTM token price:{' '}
                  {ethLoading || ftmLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(ftmPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {ftmLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(ftmTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  Maker token price:{' '}
                  {ethLoading || mkrLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(mkrPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {mkrLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(mkrTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  Celsius token price:{' '}
                  {ethLoading || celsiusLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(celsiusPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {celsiusLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(celsiusTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  Compound token price:{' '}
                  {ethLoading || compLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(compPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {compLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(compTotalLiquidity).toFixed(0)}
                </h5>

                <div style={{ borderTop: "2px solid #000000 ", marginLeft: -15, marginRight: 0 }}></div>
                <h5>
                  Dai price:{' '}
                  {ethLoading || daiLoading
                    ? 'Loading token data...'
                    : '$' +
                      // parse responses as floats and fix to 2 decimals
                      (parseFloat(daiPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)}
                </h5>
                <h5>
                  Total liquidity:{' '}
                  {daiLoading
                    ? 'Loading token data...'
                    :
                      parseFloat(daiTotalLiquidity).toFixed(0)}
                </h5>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );

}



export default Pinakas

