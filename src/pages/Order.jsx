import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getOrders } from '../api';

const Container = styled.div`
  padding: 0px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  @media screen and (max-width: 768px){
    padding: 20px 12px;
  }
`;

const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  justify-content: center;
  @media screen and (max-width: 760px){
    gap 16px;
  }
`;

// const Table = styled.div`
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   gap: 40px;
//   ${({ head }) => head && `margin-bottom: 22px`}
// `;

const Table = styled.table`

  // font-size: 16px;
  // display: flex;
  // align-items: center;
  // gap: 40px;
  // ${({ head }) => head && `margin-bottom: 22px`}
`;

const Tr = styled.tr`

`;

const Th = styled.th`
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  font-weight: 700;
`;

const Td = styled.td`
  text-align: center;
  padding: 0 10px;
`;

const Ul = styled.ul`
  padding: 10px;
`;

const Li = styled.li`
  list-style-type: none;
  text-align: left;
`;

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrder = async () => {
    setLoading(true);
    const token = localStorage.getItem("foodeli-app-token");
    try {
      const res = await getOrders(token);
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Container>
      <Section>
        <Title>Your Orders</Title>
        <CardWrapper>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Table>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Total Amount</Th>
                  <Th>Address</Th>
                  <Th>Status</Th>
                  <Th>User ID</Th>
                  <Th>Products</Th>
                  <Th>Order Date</Th>
                </Tr>

                {orders.map(order => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{order.total_amount}</Td>
                    <Td>{order.address}</Td>
                    <Td>{order.status}</Td>
                    <Td>{order.user}</Td>
                    <Td>
                      <Ul>
                        {order.products.map((product, index) => (
                          <Li key={index}>
                            Product ID: {product.product}, Quantity: {product.quantity}
                          </Li>
                        ))}
                      </Ul>
                    </Td>
                    <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                  </Tr>
                ))}
              </Table>
            </>
          )}
        </CardWrapper>
      </Section>
    </Container>
  );
}

export default Order;
