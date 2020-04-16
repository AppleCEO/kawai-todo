import React, { Component } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = { isEditing: false, toDoValue: props.text };
    }
    static propTypes = { text: PropTypes.string.isRequired, isCompleted: PropTypes.bool.isRequired, deleteToDo: PropTypes.func.isRequired, id: PropTypes.string.isRequired, uncompletedToDo: PropTypes.func.isRequired, completeToDo: PropTypes.func.isRequired }
    state = {
        isEditing: false,
        toDoValue: ""
    };
    render() {
        const {isCompleted, isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo } = this.props;
        return (
            <View style={styles.container}>
                <View styels={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                </TouchableOpacity>
                {isEditing ? (<TextInput style={styles.input, styles.text } value={toDoValue} multiline={true} onChangeText={this._controllInput} returnKeyType={"done"} onBlur={this._finishEditing} />) : (<Text style={[styles.text, isCompleted ? styles.completedText: styles.uncompletedText]}>{text}</Text>
            )
                }
            </View>
            {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>☑️</Text>
                            </View>
                        </TouchableOpacity>
                    </View> 
                    ) : ( <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() => deleteToDo(id) }>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>X</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    )}
            </View>
        );
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };

    _startEditing = () => {
        this.setState({
            isEditing: true });
};
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    _controllInput = (text) => {
        this.setState({
            toDoValue: text
        });
    }
    _uncompletedToDo = (id) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos, 
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: false
                    }
                }
            }
        })
        return { ...newState };
    }
    _completedToDo = (id) => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos, 
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: true
                    }
                }
            }
        })
        return { ...newState };
    }
};

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor:"#bbb",
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "red"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width / 2,
        marginVertical: 15
    }
});