import React from 'react'
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';

export const Layout = (props) => {
  return (
      <div>
          <Header />
          <Sidebar />
          <div className="content-wrapper">
              <section className="content">
                  <div className="row">
                      {props.children}
                  </div>
              </section>
          </div>
      </div>
  )
}
