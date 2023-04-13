import { Link } from 'react-router-dom';

function Button({ className, to, href, disabled, icon, children, onClick, leftIcon, rightIcon, ...passProps }) {
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
            {leftIcon && <span>{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
