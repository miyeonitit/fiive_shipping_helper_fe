import React from 'react'

import styled from 'styled-components'

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 2px;
  border: 1px solid
    ${(props) =>
      props.$isError ? '#EE5453' : props.$isActive ? '#495057' : '#dee2e6'};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  letter-spacing: -0.4px;
  color: #495057;
`

const LoginInput = ({
  type,
  value,
  placeholder,
  maxLength,
  setValueState,
  isActive,
  isError,
}) => {
  return (
    <Input
      type={type}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => setValueState(e.target.value)}
      $isActive={isActive}
      $isError={isError}
    />
  )
}

export default LoginInput
