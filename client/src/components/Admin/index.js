import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Route, Switch } from 'react-router';
import { Layout } from './Layout';
import { Home } from '../Home';
import { FetchData } from '../FetchData';
import { Counter } from '../Counter';

import { Index as StockAdj } from './StockAdj/Index';
import { CreateEdit as StockAdjAdd } from './StockAdj/CreateEdit';
import { CreateEdit as StockAdjEdit } from './StockAdj/CreateEdit';

import { Index as JobFile } from './JobFile/Index'
import { CreateEdit as newJobFile } from './JobFile/CreateEdit'
import { Edit as EditJobFile } from './JobFile/Edit'

import { Index as ChartOfAccounts } from './Accounts/Index'
import { CreateEdit as NewChartOfAccounts } from './Accounts/CreateEdit'
import { Edit as EditChartOfAccounts } from './Accounts/Edit'

import { Index as Voucher } from './Voucher/Index'
import { CreateEditCredit as NewCreateEditCredit } from './Voucher/CreateEditCredit'
import { CreateEditDebit as NewCreateEditDebit } from './Voucher/CreateEditDebit'
import { EditCreditDebit as EditDebitCredit } from './Voucher/EditCreditDebit'

import { Index as ProjectGroupFile } from './ProjectGroupFile/Index'
import { CreateEdit as NewProjectGroupFile } from './ProjectGroupFile/CreateEdit'
import { Edit as EditProjectGroupFile } from './ProjectGroupFile/Edit'

import { Index as GroupHeadAccount } from './GroupHeadAcc/Index'
import { CreateEdit as NewGroupHeadAccount } from './GroupHeadAcc/CreateEdit'
import { Edit as EditGroupHeadAccount } from './GroupHeadAcc/Edit'

import { Index as SubHeadAcc } from './SubHeadAcc/Index'
import { CreateEdit as NewSubHeadAcc } from './SubHeadAcc/CreateEdit'
import { Edit as EditSubHeadAcc } from './SubHeadAcc/Edit'

import { CreateUser } from './User/CreateUser'
import { EditUser } from './User/EditUser'
import { Index as User } from './User/Index'
import { VoucherReport } from './Reports/VoucherReport';
import { Page404 } from './Page404';


export default function Admin() {
  return (
    <>
      <div className="wrapper">
        <Layout>
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path='/counter' component={Counter} />
            <Route exact path='/fetch-data' component={FetchData} />

            <Route exact path='/stockadj' component={StockAdj} />
            <Route exact path='/stockadj/add' component={StockAdjAdd} />
            <Route exact path="/stockadj/edit/:id" component={StockAdjEdit} />

            <Route exact path='/projectfile' component={JobFile} />
            <Route exact path='/projectfile/new' component={newJobFile} />
            <Route exact path='/projectfile/edit/:id' component={EditJobFile} />

            <Route exact path='/projectgroupfile' component={ProjectGroupFile} />
            <Route exact path='/projectgroupfile/new' component={NewProjectGroupFile} />
            <Route exact path='/projectgroupfile/edit/:id' component={EditProjectGroupFile} />

            <Route exact path='/accounts' component={ChartOfAccounts} />
            <Route exact path='/accounts/new' component={NewChartOfAccounts} />
            <Route exact path='/accounts/edit/:id' component={EditChartOfAccounts} />

            <Route exact path='/' component={Voucher} />
            <Route exact path='/voucher/credit' component={NewCreateEditCredit} />
            <Route exact path='/voucher/debit' component={NewCreateEditDebit} />
            <Route exact path='/voucher/edit/:id' component={EditDebitCredit} />

            <Route exact path='/group-head-acc' component={GroupHeadAccount} />
            <Route exact path='/group-head-acc/new' component={NewGroupHeadAccount} />
            <Route exact path='/group-head-acc/edit/:id' component={EditGroupHeadAccount} />

            <Route exact path='/sub-head-acc' component={SubHeadAcc} />
            <Route exact path='/sub-head-acc/new' component={NewSubHeadAcc} />
            <Route exact path='/sub-head-acc/edit/:id' component={EditSubHeadAcc} />
            <Route path='/voucher-report' component={VoucherReport} />
            <Route exact path='/user' component={User} />
            <Route exact path='/user/edit/:id' component={EditUser} />
            <Route exact path='/user/new' component={CreateUser} />
            <Route path='*' component={Page404} />
          </Switch >
        </Layout>
      </div>
    </>
  )
}
