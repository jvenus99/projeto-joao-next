import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 0 10%;
  i {
    cursor: pointer;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2eeed;
  min-height: 90vh;
  padding: 5% 5%;
  h1 {
    color: #2f3640;
    font-size: 2.5rem;
  }
  span {
    align-self: center;
    position: absolute;
    top: 30%;
    left: 50%;
  }
  @media (max-width: 920px) {
    align-items: center;
    span {
      top: 30%;
      left: 35%;
    }
  }
`
export const Card = styled.div`
  display: flex;
  margin: 5%;
  flex-direction: column;
  background-color: #fff;
  border-radius: 13px;
  width: 100%;
  justify-content: space-around;
  color: #2f3640;
  height: 200px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  div {
    padding: 20px;
  }

  &:hover {
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 920px) {
    flex-direction: row;
    align-items: center;
    margin: 10px;
    height: 100px;
    justify-content: space-between;
    h2,
    p {
      display: inline;
      padding: 10px;
      font-size: 22px;
    }
  }
`
