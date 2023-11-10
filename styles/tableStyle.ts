import styled, { css } from 'styled-components'

export const handleTableTrWidth = (fieldType: string) => {
  let thWidth: number = 0

  switch (fieldType) {
    case 'number':
      thWidth = 30
      break

    case 'address':
      thWidth = 200
      break

    case 'billNumber':
      thWidth = 140
      break

    default:
      thWidth = 100
  }

  return css`
    width: ${thWidth}px;

    ${fieldType === 'number' &&
    ` display: flex;
    align-items: center;
    font-size: 13px !important;
    font-weight: 200 !important;
    `}
  `
}

export const TableConfig = (fontWeight: number, letterSpacing: string) => `
  margin-right: 12px;
  font-size: 14px;
  font-weight: ${fontWeight};
  letter-spacing: ${letterSpacing};
  line-height: 130%;
  color: #343a40;

  &:last-child {
    margin-right: unset;
  }
`

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
