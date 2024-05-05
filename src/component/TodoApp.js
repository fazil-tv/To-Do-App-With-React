import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import './TodoApp.css';


export default class TodoApp extends Component {
    state = {
        input: "",
        items: [],
        editIndex: -1,
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        });
    }

    storeItems = (event) => {

        event.preventDefault();
        const { input, items, editIndex } = this.state;

        if (input.trim() === "") {
            return;
        }

        if (editIndex === -1) {

            const allitems = {
                text: input,
                checked: false
            }

            console.log(allitems);

            this.setState({
                items: [...items, allitems],
                input: "",
                editIndex: -1,
            })
        } else {
            this.savedEdit();
        }
    }

    deleteitem = (index) => {
        console.log(index)
        const allitem = this.state.items;
        allitem.splice(index, 1);

        this.setState({
            items: allitem
        })
    }

    toggleChecked = (index) => {
        this.setState((prevState) => ({
            items: prevState.items.map((text, i) =>
                i === index ? { ...text, checked: !text.checked } : text
            ),
        }));
    };

    EditItem = (index) => {
        const { items } = this.state
        this.setState({
            input: items[index].text,
            editIndex: index
        })
    }


    savedEdit = () => {
        const { input, items, editIndex } = this.state;
        if (editIndex !== -1) {
            const updatedItem = [...items];
            updatedItem[editIndex].text = input;

            this.setState({
                items: updatedItem,
                input: "",
                editIndex: -1
            })
        }
    }



    render() {
        const { input, items } = this.state;

        return (
            <div className='App pb-3'>
                <div className="container-fluid">
                    <h1 className='TodoHead'>To Do</h1>
                </div>
                <div className="container-fluid mt-5 mb-4 todoinputdiv">
                    <div className='todoinput'>
                        <div className='icon-under-input'>
                            <i class="fa-solid fa-circle-plus"></i>
                        </div>
                        <div className='inputs'>
                            <form action="" onSubmit={this.storeItems}>
                                <input type="text" className='input-1' value={input} onChange={this.handleChange} />
                            </form>
                        </div>
                    </div>
                </div>
                <div className='section-1'>
                    {items.map((data, index) => (
                        <div className='container container-fluid list-part pt-4'>
                            <div className='list-icon' onClick={() => this.toggleChecked(index)}>
                                {data.checked ?
                                    <i className="fa-regular fa-circle-check"></i>
                                    :
                                    <i className="fa-regular fa-circle"></i>
                                }
                            </div>
                            <div className='main-list'>
                                <input className={data.checked ? "todoChecked" : 'todoList'} key={index}
                                    value={data.text} disabled />
                            </div>

                            <div className="list-edit-part">
                                <i class="fa-regular fa-pen-to-square" type="button" onClick={() => this.EditItem(index)}></i>

                            </div>
                            <div className='delete-part'>
                                <i className="fa-regular fa-trash-can"
                                    type="button"
                                    onClick={() => this.deleteitem(index)}
                                > </i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
