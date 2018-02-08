# FrameJS TodoMVC

An example of minimal setup to build FrameJS custom elements inspired by [web-components-todo](https://github.com/shprink/web-components-todo).

#### Syntax

```tsx
import { CustomElement, Property, Attribute, Event, EventEmitter } from '@framejs/core';
import { withPreact, h } from '@framejs/renderer-preact';

@CustomElement({
    tag: 'todo-item',
    style: require('./todo-item.css')
})
export class TodoItem extends withPreact(HTMLElement) {
    @Attribute() checked: boolean = false;
    @Property() index: number;
    @Event() onTodoItemChecked: EventEmitter;
    @Event() onTodoItemRemove: EventEmitter;
    

    handleOnRemove = () => this.onTodoItemRemove.emit(this.index);
    handleOnChecked = () => this.onTodoItemChecked.emit(this.index);

    render(): any {
        return (
            <li class={this.checked ? 'completed' : ''}>
                <input type="checkbox" checked={this.checked} onChange={this.handleOnChecked} />
                <label><slot></slot></label>
                <button onClick={this.handleOnRemove}>x</button>
            </li>
        );
    }
}
```