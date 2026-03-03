import { Icon } from "@iconify/react";

interface Props {
  method: 'POST' | 'PUT';
  medal_id: string;
  disabled: boolean;
}

export const FormFooter = ({ method, medal_id, disabled }: Props) => (
  <footer className="flex gap-2">
    {method === 'PUT' && (
      <a className="btn btn-variant-outline btn-size-base flex-1" aria-disabled={disabled} href={`/medal/${medal_id}`}>
        <Icon icon="lucide:arrow-left" className="mr-2 inline-block" />
        Cancelar
      </a>
    )}

    <button
      type="submit"
      className="btn-variant-solid btn-size-base flex-1"
      disabled={disabled}
    >
      {disabled ? (
        <>
          <Icon icon="lucide:loader-2" className="animate-spin" />
          Guardando...
        </>
      ) : (
        <>
          <Icon icon="lucide:save" />
          Guardar
        </>
      )}
    </button>
  </footer>
);
