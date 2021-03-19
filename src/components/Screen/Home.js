import React, { Component } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./home.scss";
import AddModal from "../Modal";
import TodosList from "../List";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      todos: [],
      type: "",
      editValue: [],
    };
  }

  handleClickToAdd = () => {
    this.setState({
      showAddModal: true,
      type: "Add",
    });
  };

  onClose = () => {
    console.log("Close Clicked");
    this.setState({
      showAddModal: false,
      editValue: [],
      type: "",
    });
  };

  onSubmit = (value) => {
    // e.preventDefault();
    console.log(value);
    let count = this.state.todos.length;
    let tempValue = {
      id: count,
      title: value.title,
      description: value.description,
    };
    const initialValue = this.state.todos;
    initialValue.push(tempValue);
    this.setState({
      ...this.state,
      todos: initialValue,
      showAddModal: false,
    });
  };

  onEdit = (value) => {
    console.log("Edit");
    this.setState({
      showAddModal: true,
      type: "Edit",
      editValue: value,
    });
  };

  onDelete = (value) => {
    console.log("value onDelete", value);
    let tempValue = this.state.todos;
    console.log("tempValue", tempValue);
    if (value.id > -1) {
      if (tempValue.length === 1 && tempValue[0].id === value.id) {
        console.log("from here line 54");
        console.log("delete", tempValue.length);
        tempValue.length = 0;
        // tempValue.splice(value.id);
        console.log(tempValue);
        console.log("after delete", tempValue.length);
        this.setState({
          ...this.state,
          todos: tempValue,
        });
      } else {
        if (tempValue[0].id === value.id) {
          console.log("from here line 66");
          tempValue.shift();
          this.setState({
            // ...this.state,
            todos: tempValue,
          });
        } else if (tempValue[tempValue.length - 1] === value.id) {
          console.log("from here line 74");
          tempValue.length = tempValue.length - 2;
          this.setState({
            // ...this.state,
            todos: tempValue,
          });
        } else {
          console.log("from here line 83");
          console.log(tempValue.length);
          console.log("-->", value.id);
          tempValue.splice(value.id, 1);
          this.setState({
            // ...this.state,
            todos: tempValue,
          });
        }
      }
    }
  };

  onEditSubmit = value => {
    console.log('onEditSubmit', value);
    let tempValue = this.state.todos;
    
    var tempIndex = 0;
    tempValue.forEach((element,index) => {
      if(element.id === value.id){
        tempIndex = index;
      
      }
      
    })
    console.log(tempIndex);
    tempValue[tempIndex].title = value.title;
    tempValue[tempIndex].description = value.description;
    this.setState({
      todos: tempValue
    });
    this.onClose();
  }

  render() {
    console.log(this.state.todos);
    return (
      <div className="home_container">
        <div style={{justifyContent:'center', display:'flex',}}>
          <h1>Todo Application</h1>
        </div>
        <div style={{ justifyContent: "center", display: "flex", flex: 1 }}>
          <h4>
            Add your Todo{" "}
            <span>
              <Button type="primary" style={{ margin: 8 }} shape="circle">
                <PlusCircleOutlined onClick={this.handleClickToAdd} />
              </Button>
            </span>
          </h4>
        </div>
        <div style={{ padding: 85, justifyContent: "center" }}>
          <TodosList
            data={this.state.todos}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
          />
        </div>
        {this.state.showAddModal && this.state.type === "Add" ? (
          <AddModal
            type={this.state.type}
            onSubmit={this.onSubmit}
            onClose={this.onClose}
            showModal={this.state.showAddModal}
          />
        ) : null}
        {this.state.showAddModal && this.state.type === "Edit" && (
          <AddModal
            type={this.state.type}
            onSubmit={this.onSubmit}
            onClose={this.onClose}
            showModal={this.state.showAddModal}
            value={this.state.editValue}
            onEditSubmit={this.onEditSubmit}
          />
        )}
      </div>
    );
  }
}
