import { Link } from 'react-router-dom';

function Button({ className, to, href, disabled, icon, children, onClick, ...passProps }) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
        className,
        disabled,
        icon,
        to,
        href,
    };
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp {...props}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
