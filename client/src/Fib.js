import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state ={
        seenIndexes: [],
        values: {},
        index:''
    };
    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }
    async fetchValues(){
        const values =await axios.get('/api/values/current');
        this.setState({values: values.date});
    }
    async fetchIndexes(){
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: seenIndexes.data
        });
    }
    renderSeenIndexes(){
        return this.state.seenIndexes.map(({ number })=> number).join(',');
    }
    rederValues(){
        const entries=[];
        for(let key in this.state.values){
            entries.push(
                <div>
                For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }
    handleSubmit = (event)=> {
        event.preventDefault();
        await axios.post('/api/values',{
            index: this.setate.index
        });
    };
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Your Index</label>
                    <input 
                    value={this.state.index}
                    onChange={this.setState({ index: event.target.value})}/>
                    <button>Submit</button>
                </form>
                <h3>Indexes I Have seen</h3>
                {this.renderSeenIndexes()}
                <h3>Calcuated values</h3>
                {this.rederValues()}
            </div>
        )
    }
}
export default Fib;