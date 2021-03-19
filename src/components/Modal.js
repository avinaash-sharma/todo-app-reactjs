import React, { Component } from "react";
import { Modal } from "antd";
import { Input } from "antd";

const { TextArea } = Input;

export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state={
        id: props.type === "Add" ? '' : props.value.id,
        title: props.type === "Add" ? '' : props.value.title,
        description: props.type === "Add" ? '' : props.value.description,
    }
  }
  onClose = () => {
    this.props.onClose();
  };

  onOk = () => {
      console.log('submit=', this.state);
      this.props.onSubmit(this.state);
  }

  onEdit = () => {
    console.log('edit = ', this.state);
    this.props.onEditSubmit(this.state);
    
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log('From Modal', this.state);
    return (
      <div>
        <Modal
          title="Add Todos"
          centered
          visible={this.props.showModal}
          onOk={this.props.type === 'Add' ? () => this.onOk() : () => this.onEdit()}
          onCancel={() => this.onClose()}
        >
          <div style={{justifyContent: "center", alignItems: "center"}}>
            <Input key='Header' style={{ margin: 8 }} value={this.state.title} placeholder="Todo Title" name='title' onChange={this.setValue} onChange={this.handleChange} />
            <TextArea
              key='Description'
              value={this.state.description}
              style={{ margin: 8 }}
              name = 'description'
              placeholder="Brief description"
              rows={4}
              onChange={this.handleChange}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
