import styled from 'styled-components';

export const InputContainer = styled.div<{ hasError?: boolean }>`
	input {
		color: var(--font-color);
		border: 1px solid
			${props => (props.hasError ? 'red' : ` var(--border-color)`)};
		font-size: 14px;

		&:focus {
			outline: none;
		}
	}
`;
