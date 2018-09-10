/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import * as React from 'react'
// import {connect} from 'react-redux'
// import {checkNameAction} from '../App/actions'
const Form  = require('antd/lib/form')
const Row = require('antd/lib/row')
const Col = require('antd/lib/col')
const Input = require('antd/lib/input')
const Select = require('antd/lib/select')
const Option = Select.Option
const TreeSelect = require('antd/lib/tree-select')
const SHOW_PARENT = TreeSelect.SHOW_PARENT
const FormItem = Form.Item
const utilStyles =  require('../../assets/less/util.less')



interface IConfigFormProps {
  form: any
  type: string
  vizs: any
  dashboardTree: any[]
  treeSelect: () => any
  treeChange: () => any
  loadTreeData: () => any
  dashboardTreeValue: any
}

export class ConfigForm extends React.PureComponent<IConfigFormProps> {
  public render () {
    const { getFieldDecorator } = this.props.form
    const { dashboardTree, dashboardTreeValue, treeSelect, treeChange, loadTreeData, vizs } = this.props
    const commonFormItemStyle = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    const treeSelectProps = {
      size: 'large',
      multiple: true,
      maxHeight: 400,
      overflow: 'auto',
      treeCheckable: true,
      onChange: treeChange,
      onSelect: treeSelect,
      treeData: vizs,
      value: dashboardTreeValue,
      loadData: loadTreeData,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select'
    }
    return (
      <Form>
        <Row>
          <Col>
            <FormItem
              label="主题"
              labelCol={{span: 2}}
              wrapperCol={{span: 21}}
            >
              {getFieldDecorator('subject', {
                rules: [{
                  required: true,
                  message: 'Name 不能为空'
                }]
              })(
                <Input placeholder="subject" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem className={utilStyles.hide}>
              {getFieldDecorator('id', {
                hidden: this.props.type === 'add'
              })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="收件人"
              {...commonFormItemStyle}
            >
              {getFieldDecorator('to', {
                rules: [{
                  required: true,
                  message: 'Name 不能为空'
                }]
              })(
                <Input placeholder="to" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="抄送"
              {...commonFormItemStyle}
            >
              {getFieldDecorator('cc', {

              })(
                <Input placeholder="cc" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <FormItem
              label="私密发送"
              {...commonFormItemStyle}
            >
              {getFieldDecorator('bcc', {
                initialValue: ''
              })(
                <Input placeholder="bcc" />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="文件类型"
              {...commonFormItemStyle}
            >
              {getFieldDecorator('type', {
                initialValue: 'image'
              })(
                <Select>
                  <Option value="excel">excel</Option>
                  <Option value="image">image</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <div className="ant-col-2 ant-form-item-label"><label className="" title="发送项">发送项</label></div>
          <Col span={21}>
            <TreeSelect {...treeSelectProps} />
          </Col>
        </Row>
      </Form>
    )
  }
}


export default Form.create()(ConfigForm)
