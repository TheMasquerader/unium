//-------------------------------------------------------------------------------

import React from 'react'
import { connect } from 'react-redux'

import {
  Modal,
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
  DropdownButton,
  InputGroup,
  MenuItem,
  Checkbox,
  Panel
} from 'react-bootstrap'


import { CancelDialog } from '../actions/App.jsx'

const initialState = {
  name      : '',
  style     : 'Default',
  query     : '/q/scene',
  logOutput : false
}


//-------------------------------------------------------------------------------

@connect( (store) => {
  return {
    app: store.app
  }
})
export default class AcModalAddWidget extends React.Component {

  onCancel = () => {
    this.props.dispatch( CancelDialog() )
  }

  onOK = () => {
    if( this.state.name != '' ) {
      this.props.app.dialog.callback( { ...this.state, style: this.state.style.toLowerCase() } )
    }
    this.state = { ...initialState }
    this.onCancel()
  }


  //-------------------------------------------------------------------------------

  constructor( props ) {
    super( props )
    this.state = { ...initialState }
  }

  onChangeName      = (e) => { this.setState({ name: e.target.value }) }
  onChangeStyle     = (e) => { this.setState({ style: e }) }
  onChangeQuery     = (e) => { this.setState({ query: e.target.value }) }
  onChangeLogOutput = (e) => { this.setState({ logOutput: e.target.checked }) }


  //-------------------------------------------------------------------------------

  render() {

    var { app } = this.props
    var { dialog } = app

    if( dialog == null || dialog.modal != "addWidget" ) {
      return null
    }
    
    return (
      <Modal show={true} onHide={this.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Add Widget</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form horizontal>

            <FormGroup controlId="formName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formType">
              <Col componentClass={ControlLabel} sm={2}>
                Style
              </Col>
              
              <Col sm={10}>
                <DropdownButton
                    componentClass={InputGroup.Button}
                    id="formType"
                    title={this.state.style}
                  >
                    <MenuItem key="1" onSelect={()=>this.onChangeStyle('Default')}>
                      <Panel header="Default"/>
                    </MenuItem>
                    <MenuItem key="2" onSelect={()=>this.onChangeStyle('Primary')}>
                      <Panel header="Primary" bsStyle="primary"/>
                    </MenuItem>
                    <MenuItem key="3" onSelect={()=>this.onChangeStyle('Success')}>
                      <Panel header="Success" bsStyle="success"/>
                    </MenuItem>
                    <MenuItem key="4" onSelect={()=>this.onChangeStyle('Info')}>
                      <Panel header="Info" bsStyle="info"/>
                    </MenuItem>
                    <MenuItem key="5" onSelect={()=>this.onChangeStyle('Warning')}>
                      <Panel header="Warning" bsStyle="warning"/>
                    </MenuItem>
                    <MenuItem key="6" onSelect={()=>this.onChangeStyle('Danger')}>
                      <Panel header="Danger" bsStyle="danger"/>
                    </MenuItem>
                  </DropdownButton>
              </Col>
            </FormGroup>

            <FormGroup controlId="formName">
              <Col componentClass={ControlLabel} sm={2}>
                Query
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  value={this.state.query}
                  onChange={this.onChangeQuery}
                />
              </Col>
            </FormGroup>

            <FormGroup controlId="formName">
              <Col componentClass={ControlLabel} sm={2}>
                Log Output
              </Col>
              <Col sm={10}>
                <Checkbox
                  value={this.state.logOutput}
                  onChange={this.onChangeLogOutput} />
              </Col>
            </FormGroup>

          </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="default" onClick={this.onCancel}>Cancel</Button>
            <Button bsStyle="success" onClick={this.onOK}>Create Widget</Button>
          </Modal.Footer>          
      </Modal>
    )
  }
}