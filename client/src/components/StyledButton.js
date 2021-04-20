import { compose, shadows, spacing } from "@material-ui/system";
import { styled } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const StyledButton = styled(Button)(compose(shadows, spacing));

export default StyledButton;
