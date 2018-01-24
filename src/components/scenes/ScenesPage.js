import React, {Component} from 'react'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteSceneActionCreator} from "../../actions/deleteScene";

class ScenesPage extends Component{
    render(){

        //Tabs
        const styles = {
            tabs: {
                width: '100%',
                display: 'inline-block',
                marginRight: '30px',
                verticalAlign: 'top'
            },
            links: {
                margin: 0,
                padding: 0
            },
            tabLink: {
                height: '30px',
                lineHeight: '30px',
                padding: '0 15px',
                cursor: 'pointer',
                borderBottom: '2px solid transparent',
                display: 'inline-block'
            },
            activeLinkStyle: {
                borderBottom: '2px solid #333'
            },
            visibleTabStyle: {
                display: 'inline-block'
            },
            content: {
                padding: '0 15px'
            }
        };

        //Table
        const data = this.props.scenes;

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: props => <span>Description of Scene</span>, // Custom header components!
            accessor: 'description'
        }, {
            Header: 'Sq Ft',
            accessor: 'sqft',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            id: 'customerName',
            Header: 'Customer Name',
            accessor: d => d.customer.name // Custom value accessors!
        },{
            Header: 'Delete?',
            Cell: row => (
                <button onClick={() => {this.props.handleDelete(row.original)}}>Delete</button>
            )
        }];

        // File Uploader
        var componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/uploadHandler'
        };
        var djsConfig = { autoProcessQueue: false }
        var eventHandlers = { addedfile: (file) => console.log(file) }


        return (
            <div className="container">
                <DropzoneComponent config={componentConfig}
                                   eventHandlers={eventHandlers}
                                   djsConfig={djsConfig} />
                <div>
                    <Tabs activeLinkStyle={styles.activeLinkStyle} visibleTabStyle={styles.visibleTabStyle} style={styles.tabs}>
                        <div style={styles.links}>
                            <TabLink to="tab1" default style={styles.tabLink} className="col-md-4 text-center">My Scenes</TabLink>
                            <TabLink to="tab2" style={styles.tabLink} className="col-md-4 text-center">Approved Scenes</TabLink>
                            <TabLink to="tab3" style={styles.tabLink} className="col-md-4 text-center">Waiting Approval</TabLink>
                        </div>

                        <div style={styles.content} >
                            <TabContent for="tab1" className="col-md-12">
                                <hr />
                                <ReactTable
                                    data={data}
                                    columns={columns}
                                    defaultPageSize={12}
                                />
                            </TabContent>
                            <TabContent for="tab2" className="col-md-12">
                                <hr />
                                <ReactTable
                                    data={data}
                                    columns={columns}
                                    defaultPageSize={8}
                                />
                            </TabContent>
                            <TabContent for="tab3" className="col-md-12">
                                <hr />
                                <ReactTable
                                    data={data}
                                    columns={columns}
                                    defaultPageSize={5}
                                />
                            </TabContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    scenes: state.scenes
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        handleDelete: deleteSceneActionCreator
    }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(ScenesPage);