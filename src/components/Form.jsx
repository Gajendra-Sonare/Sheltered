import React from "react";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            price: "",
            selectedFile : null,
            img : null
        }
    }
    handlePriceChange= (event) =>{
        this.setState({
            price: event.target.value
        });
    }
    handleFileChange = (event) =>{
        this.setState({
            img : URL.createObjectURL(event.target.files[0]),
            selectedFile: event.target.files[0]
        })
    }

    handleSubmit = (event) =>{
        alert("Your price is: " + this.state.price);
        
        event.preventDefault();
    }


    render(){
        return(
            <form>
                <div>
                    <label>price</label>
                    <input type="text" name="price" value={this.state.price} placeholder="price" onChange={this.handlePriceChange}/>
                </div>
                
                <div>
                    <input type="file" name="file" onChange={this.handleFileChange}/>
                </div>

                <button type="submit" onClick={this.handleSubmit}>submit</button>
                <img src={this.state.img} height={150} width={200}/>
            </form>
        )
    }
}
export default Form;