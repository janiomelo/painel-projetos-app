import React, { Component } from 'react';
import { Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { PulseLoader } from 'react-spinners';
import { css } from '@emotion/core';
import { isEmpty } from 'lodash';
import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Navigation = styled.div`
  width: 200px;
  flex-shrink: 0;
  background: #fff;
  height: 100vh;
  background-color: #3a4248;
  border-right: 1px solid rgba(0, 0, 0, 0.125);
`;
export const Body = styled.div`
  padding: 0px;
  height: 100vh;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 12px;
`;

export const Separator = styled.div`
  padding: .75rem 1rem;
  font-size: 80%;
  font-weight: 700;
  color: #e4e7ea;
  text-transform: uppercase;
  color: white;
`;


export const LabelField = (props) => {
  return (
    <label className="labelField">{props.children}</label>
  )
}

export const SpanField = (props) => {
  return (
    <span className="spanField">{props.children}</span>
  )
}

const override = css`
    display: block;
    margin-top: 60px;
    margin-right: auto;
    margin-left: auto;
    width: 70px;
`;

export class BaseContainer extends Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
          {!isEmpty(this.props.rotaMeio) ? (
            <BreadcrumbItem>
              <a href={this.props.rotaMeio.url}>
                {this.props.rotaMeio.rotulo}
              </a>
            </BreadcrumbItem>
          ) : null}
          <BreadcrumbItem active>{this.props.title}</BreadcrumbItem>
        </Breadcrumb>
        <Container fluid className="myContainer">
          <PulseLoader
            css={override}
            color={'#007bff'}
            loading={this.props.loading}
          />
          {this.props.children}
        </Container>
      </div>
    );
  }
}