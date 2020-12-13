import React from 'react';
import {connect} from 'react-redux';
import {follow, setCurrentPage, setUsers, toggleIsFetching, unfollow} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {userAPI} from "../../api/api";

class UsersContainer extends React.Component {
    componentDidMount() {
        if (this.props.users.length === 0) {
            this.props.toggleIsFetching(true)

            userAPI.getUsers(this.props.pageUsersSize, this.props.currentPage).then(data => {
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(data.items, data.totalCount)
                })
        }
    }

    onChangePage = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)

        userAPI.getUsers(this.props.pageUsersSize, pageNumber).then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items, data.totalCount)
            })
    }

    render() {
        return <>
            {this.props.isFetching && <Preloader/>}

            <Users
                users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageUsersSize={this.props.pageUsersSize}
                currentPage={this.props.currentPage}

                onChangePage={this.onChangePage}
                follow={(userId) => this.props.follow(userId)}
                unfollow={(userId) => this.props.unfollow(userId)}
            />
        </>
    }
}

let mapStateToProps = (state) => ({
    users: state.usersPage.users,
    currentPage: state.usersPage.currentPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageUsersSize: state.usersPage.pageUsersSize,
    isFetching: state.usersPage.isFetching
})

export default connect(mapStateToProps,
    {
        follow, unfollow, setUsers,
        setCurrentPage, toggleIsFetching
    }
)(UsersContainer)