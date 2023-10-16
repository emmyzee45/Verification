import React, { useState } from 'react';
import "./subscriptions.css"
import { useParams } from 'react-router-dom';

const Subscriptions = () => {
    const [isOpen, setIsOpen] = useState(false)
    const params = useParams()
    console.log(params.category)
  return (
    <div className='subsContainer'>
      <h1 className='subsTitle'>AVailable Servicers</h1>
      <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Monthly Price</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1st sweet</td>
                    <td className='price'>$50</td>
                <td className='subsActions'>
                    <input type='number' min={1} className='actionsInput' />
                    <button className='addButton'>Add</button>
                    <button className='addButton warning'>Update</button>
                    <button className='addButton danger'>Remove</button>
                </td>
            </tr>
            <tr>
                <td>1st sweet</td>
                    <td className='price'>$50</td>
                <td className='subsActions'>
                    <input type='number' min={1} className='actionsInput' />
                    <button className='addButton'>Add</button>
                    <button className='addButton warning'>Update</button>
                    <button className='addButton danger'>Remove</button>
                </td>
            </tr>
            <tr>
                <td>1st sweet</td>
                    <td className='price'>$50</td>
                <td className='subsActions'>
                    <input type='number' min={1} className='actionsInput' />
                    <button className='addButton'>Add</button>
                    <button className='addButton danger'>Update</button>
                    <button className='addButton danger'>Remove</button>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Subscriptions;
