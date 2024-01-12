import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <div>
            {/*<!-- Left side column. contains the logo and sidebar -->*/}
            <aside className="main-sidebar">
                {/*<!-- sidebar: style can be found in sidebar.less -->*/}
                <section className="sidebar">
                    {/*<!-- Sidebar user panel -->*/}
                    {/* <div className="user-panel">
                        <div className="pull-left image">
                            <img src="" className="img-circle" alt="" />
                        </div>
                        <div className="pull-left info">
                            <p>{name}</p>
                        </div>
                    </div> */}
                    {/*<!-- sidebar menu: : style can be found in sidebar.less -->*/}
                    <ul className="sidebar-menu">
                        <li className="header">MAIN MENU</li>
                        {/* <li className="active treeview">
                            <Link to="/">
                                <i className="fa fa-th"></i> <span>Dashboard</span> <i className="fa fa-angle-left pull-right"></i>
                            </Link>
                            <ul className="treeview-menu">
                                <li><Link to="/"><i className="fa fa-circle-o"></i> Dashboard v1</Link></li>
                                <li><Link to="/counter"><i className="fa fa-circle-o"></i> Dashboard v2</Link></li>
                            </ul>
                        </li> */}
                        {/* <li className="active treeview">
                            <a href="#">
                                <i className="fa fa-th"></i> <span>Inventory</span> <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/StockAdj" ><i className="fa fa-circle-o"></i> Stock Adjustment</Link></li>
                            </ul>
                        </li> */}
                            <li className="active treeview">
                                <a href="#">
                                    <i className="fa fa-th"></i> <span>User</span> <i className="fa fa-angle-left pull-right"></i>
                                </a>
                                <ul className="treeview-menu">
                                    <li className="active"><Link to="/user" ><i className="fa fa-circle-o"></i>Add User</Link></li>
                                </ul>
                            </li>
                        <li className="active treeview">
                            <a href="#">
                                <i className="fa fa-th"></i> <span>Project Costing</span> <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/projectfile" ><i className="fa fa-circle-o"></i> Project File</Link></li>
                            </ul>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/projectgroupfile" ><i className="fa fa-circle-o"></i> Project group File</Link></li>
                            </ul>
                        </li>
                        <li className="active treeview">
                            <a href="#">
                                <i className="fa fa-th"></i> <span>Accounts</span> <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/accounts" ><i className="fa fa-circle-o"></i>Chart of Accounts</Link></li>
                            </ul>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/" ><i className="fa fa-circle-o"></i>Voucher</Link></li>
                            </ul>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/group-head-acc" ><i className="fa fa-circle-o"></i>Group Head A/C</Link></li>
                            </ul>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/sub-head-acc" ><i className="fa fa-circle-o"></i>Sub Head A/C</Link></li>
                            </ul>
                        </li>

                        <li className="active treeview">
                            <a href="#">
                                <i className="fa fa-th"></i> <span>Reports</span> <i className="fa fa-angle-left pull-right"></i>
                            </a>
                            <ul className="treeview-menu">
                                <li className="active"><Link to="/voucher-report" ><i className="fa fa-circle-o"></i>Voucher</Link></li>
                            </ul>
                        </li>
                    </ul>
                </section>
                {/*<!-- /.sidebar -->*/}
            </aside>
        </div>
    )
}
