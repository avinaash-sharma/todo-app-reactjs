import React, { Component } from "react";
import { List, Avatar, Button } from "antd";

export default class TodosList extends Component {
    constructor(props){
        super(props);
        this.state={
            data: props.data
        }
    }

    onDelete = value => {
        // console.log('OnDelete', value);
        this.props.onDelete(value);
    }
    onEdit = value => {
        this.props.onEdit(value);
    }
  render() {
    return (
      <div>
        <List
          itemLayout="horizontal"
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar>{item.id}</Avatar>
                }
                title={item.title}
                description={item.description}
              />
              <Button type="primary" style={{margin: 8}} onClick={() => this.onDelete(item)}>Delete</Button>
              <Button type="primary" style={{margin: 8}} onClick={() => this.onEdit(item)}>Edit</Button>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
