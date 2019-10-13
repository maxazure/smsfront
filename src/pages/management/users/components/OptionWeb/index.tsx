import React, { Component } from 'react';
import {Select} from 'antd';
import request from '@/utils/request';

export default class OptionWeb extends Component{
    state = {
        options: [],
        path: this.props.path || "/api/companies"
      }

    componentDidMount(){
        const { Option } = Select;
        const { path } = this.state;
        request(path).then(
            (response)=>{
                console.log(response)
                this.setState(
                    {options : response.map(d => <Option key={d.id}>{d.name}</Option>)}
                )
            }
        )
 
        
    }

    render(){
        const { options } = this.state;
        return(
            <Select {...this.props}
              placeholder="Select a Company"
            >
            {options}
            </Select>
        )
    }
}