import { PropsWithChildren } from "react";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { agreementModel, UserAgreementList } from "entities/user-agreement";
import {
  AgreementButton,
  AgreementCheckbox,
  checkedAgreementModel,
} from "features/user-agreement-checked";

import { Card } from "shared/components";
import { ScrollableContentiner, Typography } from "shared/ui/components";
import { ITheme } from "shared/ui/theme/theme";
import { useTranslation } from "react-i18next";

export type UserAgreementCardProps = PropsWithChildren<{
  data: agreementModel.License;
  title: string;
}>;

const header = (
  <Typography className="agreement__title" variant="h5">
    Пользовательское соглашение
  </Typography>
);

export const UserAgreementCard = ({ data, title }: UserAgreementCardProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const checked = checkedAgreementModel.selectors.useAgreement();
  return (
    <Card
      className={clsx("agreement__card", classes.card)}
      header={header}
      body={
        <ScrollableContentiner className={classes.scroll}>
          <Typography variant="h6">{title}</Typography>
          <UserAgreementList data={data} />
        </ScrollableContentiner>
      }
      footer={
        <>
          <AgreementCheckbox
            label={t(`agereement:checkbox-label`)}
            checked={checked}
            onChange={checkedAgreementModel.events.toggleAgreement}
          />
          <AgreementButton
            className={classes.btn}
            label={t(`agereement:button-label`)}
            disabled={!checked}
            action={() => console.log("qwe")}
          />
        </>
      }
    />
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { maxWidth: 600, marginBottom: theme.spacing(6) },
    scroll: { maxHeight: 500, overflow: "auto" },
    btn: { marginLeft: "auto" },
  })
);
