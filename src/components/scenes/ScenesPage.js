import React, {Component} from 'react'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css'


export default class ScenesPage extends Component{
    render(){
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

        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23,
            }
        },{
            name: 'sasdsas Linsley',
            age: 36,
            friend: {
                name: 'sfs Maurer',
                age: 53,
            }
        }];

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Friend Name',
            accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: props => <span>Friend Age</span>, // Custom header components!
            accessor: 'friend.age'
        }];

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