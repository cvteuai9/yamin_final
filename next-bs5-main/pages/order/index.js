import React, { useEffect, useState } from 'react'
import Leftnav from '@/components/member/left-nav'
import { useAuth } from '@/hooks/my-use-auth'
export default function OrderOne() {
  const { auth } = useAuth()
  const [userID, setUserId] = useState(0)
  const [orderDetail, setOrderDetail] = useState([])
  useEffect(() => {
    setUserId(auth.userData.id)
  }, [auth])
  useEffect(() => {
    getOrderDetails(userID)
  }, [userID])
  async function getOrderDetails(userID) {
    try {
      const apiUrl = new URL('http://localhost:3005/api/yamin_order')
      let searchParams = new URLSearchParams({
        user_id: userID,
      })
      apiUrl.search = searchParams

      const res = await fetch(apiUrl)
      const data = await res.json()
      setOrderDetail(data)
      // console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function CheckOrderDetail(orderId, orderState) {
    try {
      const apiUrl = new URL('http://localhost:3005/api/yamin_order/orderId')
      let searchParams = new URLSearchParams({
        orderId: orderId,
        orderState: orderState,
      })

      apiUrl.search = searchParams
      const res = await fetch(apiUrl)
      const data = await res.json()
      orderId = parseInt(orderId)
      switch (orderState) {
        case 1:
          console.log('看switch', orderState)
          window.location.href = `http://localhost:3000/order/orderTwoOneList?orderId=${orderId}`
          break
        case 2:
          console.log('看switch', orderState)
          window.location.href = `http://localhost:3000/order/orderTwoTwoList?orderId=${orderId}`
          break
        case 3:
          console.log('看switch', orderState)
          window.location.href = `http://localhost:3000/order/orderTwoThreeList?orderId=${orderId}`
          break
        case 4:
          console.log('看switch', orderState)
          window.location.href = `http://localhost:3000/order/orderTwoFourList?orderId=${orderId}`
          break
        case 5:
          console.log('看switch', orderState)
          window.location.href = `http://localhost:3000/order/orderTwoFiveList?orderId=${orderId}`
          break
      }
    } catch (err) {
      console.log(err)
    }
  }

  console.log(orderDetail)
  return (
    <>
      <div className="container-fluid order mb-6">
        {/* 會員中心Title */}
        <div className="d-flex">
          <div className="titlenav">
            <img src="/images/favorite/title.svg" alt="" className="my-3" />
            <img
              src="/images/favorite/group.svg"
              alt=""
              style={{ width: '100%' }}
            />
          </div>
        </div>
        {/* 會員中心Title End */}
        <div className="profile-content">
          <div className="row mt-4 ">
            <div className="col-md-4 profile-content-left">
              <Leftnav fromOrder="fromOrder" />
            </div>
            {/* 歷史訂單部分 */}
            <div className="col-md-8 profile-content-right">
              <div className="orderColH3 orderTitleMd orderTitle w-100 mb-3">
                <h3>首頁 / 會員 / 訂單</h3>
              </div>
              <div className="orderColH3 orderTitle mb-3 w-100">
                <h3>歷史訂單</h3>
              </div>
              <div className="orderlistRow mb-3 row">
                <div className="orderListCol col-3">
                  <h5>訂單編號</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>訂單日期</h5>
                </div>
                <div className="orderListCol col-2">
                  <h5>總價</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>訂單狀態</h5>
                </div>
                <div className="orderListCol col-1"></div>
              </div>
              {/* <div className="orderlistRow mb-3 row">
                <div className="orderListCol col-3">
                  <h5>3131231231</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>2000/1/1</h5>
                </div>
                <div className="orderListCol col-2">
                  <h5>100000</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>完成訂單</h5>
                </div>
                <div className="orderListCol col-1">
                  <h5 className="">
                    <button className="orderListBtn">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </h5>
                </div>
              </div> */}
              {/* <div className="orderlistRow mb-3 row">
                <div className="orderListCol col-3">
                  <h5>3131231231</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>2000/1/1</h5>
                </div>
                <div className="orderListCol col-2">
                  <h5>100000</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>完成訂單</h5>
                </div>
                <div className="orderListCol col-1">
                  <h5 className="">
                    <button className="orderListBtn">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </h5>
                </div>
              </div> */}
              {/* <div className="orderlistRow mb-3 row">
                <div className="orderListCol col-3">
                  <h5>3131231231</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>2000/1/1</h5>
                </div>
                <div className="orderListCol col-2">
                  <h5>100000</h5>
                </div>
                <div className="orderListCol col-3">
                  <h5>完成訂單</h5>
                </div>
                <div className="orderListCol col-1">
                  <h5 className="">
                    <button className="orderListBtn">
                      <i className="fa-solid fa-magnifying-glass" />
                    </button>
                  </h5>
                </div>
              </div> */}
              {orderDetail.map((v, i) => {
                return (
                  <div key={v.id} className="orderlistRow mb-3 row">
                    <div className="orderListCol col-3">
                      <h5>{v.order_uuid}</h5>
                    </div>
                    <div className="orderListCol col-3">
                      <h5>{v.created_at}</h5>
                    </div>
                    <div className="orderListCol col-2">
                      <h5>{v.total_price}</h5>
                    </div>
                    <div className="orderListCol col-2">
                      {v.state === 1 ? (
                        <h5>訂單成立</h5>
                      ) : (
                        {
                          /* <h5 className="d-none"></h5> */
                        }
                      )}
                      {v.state === 2 ? <h5>已出貨</h5> : <></>}
                      {v.state === 3 ? <h5>已到貨</h5> : <></>}
                      {v.state === 4 ? <h5>已取貨</h5> : <></>}
                      {v.state === 5 ? <h5>完成訂單</h5> : <></>}
                    </div>
                    <div className="orderListCol  col-2">
                      <h5 className="" style={{ textAlign: 'center' }}>
                        <button
                          className="orderListBtn"
                          onClick={() => {
                            CheckOrderDetail(v.id, v.state)
                          }}
                        >
                          <i className="fa-solid fa-magnifying-glass" />
                        </button>
                      </h5>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* 歷史訂單部分 end*/}
          </div>
        </div>
      </div>
    </>
  )
}
