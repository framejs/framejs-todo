import { CustomElement, Property, Attribute, Event, EventEmitter } from '@framejs/core';
import { withPreact, h } from '@framejs/renderer-preact';

@CustomElement({
    tag: 'todo-item',
    style: require('./todo-item.css')
})
class TodoItem extends withPreact(HTMLElement) {
    @Attribute() checked: boolean;
    @Property() index: number;
    @Event() onTodoItemChecked: EventEmitter;
    @Event() onTodoItemRemove: EventEmitter;

    handleOnRemove = () => this.onTodoItemRemove.emit(this.index);
    handleOnChecked = () => this.onTodoItemChecked.emit(this.index);

    render(): any {
        return (
            <li class={this.checked ? 'completed' : ''}>
                <svg hidden={!this.checked} class="icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>
                <input type="checkbox" checked={this.checked} onChange={this.handleOnChecked}  id={this.index.toString() + '-checkbox'}/>
                <label for={this.index.toString() + '-checkbox'}><slot></slot></label>
                <button onClick={this.handleOnRemove}>x</button>
            </li>
        );
    }
}