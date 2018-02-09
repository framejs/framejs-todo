import { CustomElement, Event, EventEmitter } from '@framejs/core';
import { withPreact, h } from '@framejs/renderer-preact';

@CustomElement({
    tag: 'todo-input',
    style: require('./todo-input.css')
})
class TodoInput extends withPreact(HTMLElement) {
    public value: string = '';
    @Event() onTodoInputSubmit: EventEmitter;

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (!this.value) return;
        this.onTodoInputSubmit.emit(this.value);
        this.value = '';
        (this as any)._invalidate();
    }
    
    handleInputChange = (event: any) => this.value = event.target.value;

    render() {
        return (
            <form onSubmit={this.handleOnSubmit}>
                <input
                value={this.value}
                type="text"
                placeholder="What needs to be done?"
                onInput={this.handleInputChange}
                />
            </form>
        );
    }
}