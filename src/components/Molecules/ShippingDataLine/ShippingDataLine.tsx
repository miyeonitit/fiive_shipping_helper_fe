import React, { useEffect, useState } from 'react'

import styled, { css } from 'styled-components'

import { TableConfig, handleTableTrWidth } from '../../../../styles/tableStyle'

const TableValue = styled.td`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${TableConfig(400, '-0.5px')}
  ${(props) => handleTableTrWidth(props.$field)};

  ${(props) =>
    props.$field === 'body' &&
    `
    border-bottom: unset;

    &:hover {
      background-color: #f8f9fa;
    }
  `}
`

const Status = styled.span`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 135%;
  padding: 4px 8px;
  border-radius: 62px;
 
  ${(props) => {
    let fontColorCode: string = ''
    let backgroundColorCode: string = ''

    switch (props.$field) {
      // red
      case '환불':
        fontColorCode = '#ee5453'
        backgroundColorCode = '#fdeaea'
        break

      // blue
      case '간선상차':
      case '간선하차':
        fontColorCode = '#6680ff'
        backgroundColorCode = '#e8ecfc'
        break

      // green
      case '배송출발':
        fontColorCode = '#5fbf7c'
        backgroundColorCode = '#ebf7ef'
        break

      // purple
      case '배송완료':
        fontColorCode = '#96f'
        backgroundColorCode = '#f2ecff'
        break

      // gray
      default:
        fontColorCode = '#212529'
        backgroundColorCode = '#f1f3f5'
    }

    return css`
      color: ${fontColorCode};
      background-color: ${backgroundColorCode};
    `
  }}}
`

const ShippingDataLine = ({
  receiver,
  getDetailStatus,
  TableSectionLine,
  TableSection,
}: any) => {
  return (
    <TableSectionLine
      $section='body'
      onClick={() => getDetailStatus(receiver.billNumber.replace(/-/g, ''))}
    >
      <TableSection $field='number'>{receiver.id}</TableSection>
      <TableValue>{receiver.shipItem}</TableValue>
      <TableValue>{receiver.receiverName}</TableValue>
      <TableValue>{receiver.receiverTelNumber}</TableValue>
      <TableValue $field='address'>{receiver.receiverAddress}</TableValue>
      <TableValue>
        <Status $field={receiver.reservationStatus}>
          {receiver.reservationStatus}
        </Status>
      </TableValue>
      <TableValue $field='billNumber'>{receiver.billNumber}</TableValue>
      <TableValue>{receiver.plannedCollectPlace}</TableValue>
      <TableValue>{receiver.receptionDate}</TableValue>
      <TableValue>{receiver.expectedCollectionDate}</TableValue>
      <TableValue>{receiver.collectionDate}</TableValue>
      <TableValue>{receiver.reservationClassification}</TableValue>
      <TableValue $field='billNumber'>{receiver.reservationNumber}</TableValue>
      <TableValue>{receiver.senderId}</TableValue>
      <TableValue>{receiver.senderName}</TableValue>
      <TableValue>{receiver.sendedOrganizationName}</TableValue>
      <TableValue>{receiver.senderTelNumber}</TableValue>
      <TableValue $field='address'>{receiver.senderAddress}</TableValue>
      <TableValue>{receiver.quantity}</TableValue>
      <TableValue>{receiver.receptionNumber}</TableValue>
      <TableValue>{receiver.reservatedMedia}</TableValue>
    </TableSectionLine>
  )
}

export default ShippingDataLine
