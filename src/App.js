import React from 'react';
import axios from 'axios';

function ModulePanel (){

    const [moduleName, setModuleName] = React.useState('');
    const [code, setCode] = React.useState('');
    const [mark, setMark] = React.useState('');
    

    function fetchModuleRecords(){
        axios.get('http://localhost:8090/modules')
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    function saveModule(){
        const value = {
            name: moduleName,
            code: code,
            mark: mark
        };

        axios.post('http://localhost:8090/module', value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    function deleteModule(){
        axios.delete(`http://localhost:8090/deleteModule/${moduleName}`)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    
    function updateModule(){
        const value = {
            name: moduleName,
            code: code,
            mark: mark
        };
        axios.put(`http://localhost:8090/updateModule/${moduleName}`, value)
        .then( (response) => {
            // handle success
            var resData = response.data;
            let data = JSON.stringify(resData);
            window.alert("Response recieved from server = " + data);
        });
    }


    function displayModuleHandler(){
        fetchModuleRecords();
    }

    function saveModuleHandler(){
        saveModule();
    }


    function deleteModuleHandler(){
        deleteModule();
    }

    function updateModuleHandler(){
        updateModule();
    }

    return(<div>
         <input type="text" placeholder='Module Name' value ={moduleName} onChange ={e => setModuleName(e.target.value) }/>
            <br/>
            <input type="text" placeholder='Module code' value ={code} onChange ={e => setCode(e.target.value) }/>
            <br/>
            <input type="text" placeholder='Module Mark' value ={mark} onChange ={e => setMark(e.target.value) }/>
            <br/>            
            <button onClick={saveModuleHandler}>Save Module</button> 
            <br/>
            <button onClick={deleteModuleHandler}>delete Module</button> 
            <br/>
            <button onClick={updateModuleHandler}>Update Module</button> 
            <br/>            
            <h3>Show Modules:</h3>
            <button onClick={displayModuleHandler}>Display Module</button>


    </div>);

}

export default ModulePanel;