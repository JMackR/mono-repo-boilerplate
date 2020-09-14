import React, { useState, FC } from "react"
import { GraphGQLErrorParser } from "../../network"
import { useMutation } from "@apollo/react-hooks"
import { Stack, SpacerFlex, ActivityIndicator, Text, Flex } from "uc-lib"
import { ValidatedForm, ValidatedFormInput, ValidatedFormButton } from "../../controllers"
import { translate } from "../../utilities"
// import {
//   AnalyticsAuthShared,
//   AuthScreenElement } from "../../analytics"
import { RequiredValidator } from "uc-lib"

export const PasswordResetConfirm: FC<{
  confirmationToken: string
  onSuccess: () => void
}> = ({ confirmationToken, onSuccess }) => {
  const [newPassword, setNewPassword] = useState<string | undefined>()
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [resetPasswordConfirm] = useMutation(RESET_PASSWORD_CONFIRM_MUTATION)

  const onChangePassword = async () => {
    if (confirmPassword !== newPassword) {
      setError(translate("profile-stack.change-password.not-match-error"))
      return
    }
    setLoading(true)
    setError(undefined)
    try {
      await resetPasswordConfirm({
        variables: {
          password: newPassword,
          confirmationToken,
        },
      })
      // AnalyticsAuthShared.trackResetPasswordEventClick(AuthScreenElement.Submit, true)
      onSuccess()
    } catch (e) {
      const { message, title } = GraphGQLErrorParser(e)
      setError(message || title)
      // AnalyticsAuthShared.trackResetPasswordEventClick(AuthScreenElement.Submit, false)
    }

    setLoading(false)
  }
  return (
    <Stack direction="column" width="100%">
      <ValidatedForm
        validators={{
          newPassword: [RequiredValidator],
          confirmPassword: [RequiredValidator],
        }}
      >
        <Stack direction="column" crossAxisDistribution="center" grow={1} childSeparationStep={4}>
          <Stack childSeparationStep={4} grow={1} width="100%" direction="column">
            <ValidatedFormInput
              role="newPassword"
              text={newPassword}
              secureTextEntry={true}
              title={translate("profile-stack.change-password.new-password")}
              textChangeHandler={setNewPassword}
              returnKeyType={"next"}
            />
            <ValidatedFormInput
              role="confirmPassword"
              text={confirmPassword}
              secureTextEntry={true}
              title={translate("profile-stack.change-password.new-password-confirm")}
              textChangeHandler={setConfirmPassword}
              returnKeyType={"done"}
            />
          </Stack>
          <SpacerFlex />
          {loading && (
            <>
              <ActivityIndicator size="large" />
              <SpacerFlex />
            </>
          )}
          {error && <Text textAlign="center" color="error" textType="tertiaryBody2" text={error} />}
          <Flex direction="column" width="100%" grow={1}>
            <ValidatedFormButton
              title={translate("profile-stack.change-password.submit")}
              buttonSize="large"
              buttonType={loading ? "disabled" : "primary"}
              onClick={onChangePassword}
            />
          </Flex>
        </Stack>
      </ValidatedForm>
    </Stack>
  )
}
