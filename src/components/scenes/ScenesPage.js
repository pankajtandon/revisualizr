import React, {Component} from 'react'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteSceneActionCreator} from "../../actions/deleteScene";
import {fetchScenes, fetchScenesFailure, fetchScenesSuccess} from "../../actions/scenes";

class ScenesPage extends Component{
    constructor () {
        super();
    };

    componentWillMount() {
        this.props.retrieveScenes();
    }

    render(){
        console.log('State in renderer: ', this.props);
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
        let { scenes, loading, error } = this.props.scenesList || {scenes:[], loading: false, error: null};
        const deleteSceneId = this.props.deleteSceneId;
        if (deleteSceneId && deleteSceneId.id) {
            scenes = scenes.filter((scene) => {
                return scene.id != deleteSceneId.id
            });
        }
        let feedback = null;
        if (loading) {
            feedback = <div><h3>Loading...</h3></div>
        } else if (error && error.message) {
            feedback = <div className="alert alert-danger">Error: {error && error.message}</div>
        }

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: row => (
                  <Link style={{color:'blue'}} to={"scenes/" + row.original.id}>
                    <h4 className="list-group-item-heading">{row.original.name}</h4>
                  </Link>
            )
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
                <button onClick={() => {
                    this.props.handleDelete(row.original)
                }}>Delete</button>
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
                    <button onClick={this.props.handleDelete.bind(this, {bar: 3})}>Test</button>
                    {feedback}
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
                                    data={scenes}
                                    columns={columns}
                                    defaultPageSize={12}
                                />
                            </TabContent>
                            <TabContent for="tab2" className="col-md-12">
                                <hr />
                                <ReactTable
                                    data={scenes}
                                    columns={columns}
                                    defaultPageSize={8}
                                />
                            </TabContent>
                            <TabContent for="tab3" className="col-md-12">
                                <hr />
                                <ReactTable
                                    data={scenes}
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

const mapStateToProps = (state) => {
  return {
    scenesList: state.scenes.scenesList,
    deleteSceneId: state.deleteSceneId
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleDelete: (scene) => {dispatch(deleteSceneActionCreator(scene))},
        retrieveScenes: () => {
            dispatch(fetchScenes()).then((response) => {
                !response.error ? dispatch(fetchScenesSuccess(response.payload.data)) : dispatch(fetchScenesFailure(response.payload.data));
            });
        }
    };
}


export default connect (mapStateToProps, mapDispatchToProps)(ScenesPage);