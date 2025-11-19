import { useEffect, useState } from "react";
import { FiTag, FiPlus, FiX } from "react-icons/fi";
import LabelModal from "../../components/LabelModal";
import { useUIStore } from "../../modules/ui/ui.store";
import { labelRepository } from "../../modules/labels/label.repository";
import { useLabelStore } from "../../modules/labels/label.store";

export default function LabelSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addFlashMessage } = useUIStore();
  const { addLabel, setLabels, labels } = useLabelStore();

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    try {
      const labels = await labelRepository.getLabels();
      setLabels(labels);
    } catch (error) {
      console.error(error);
      addFlashMessage("ラベルの取得に失敗しました", "error");
    }
  };

  const createLabel = async (name: string, color: string) => {
    try {
      const newLabel = await labelRepository.createLabel(name, color);
      addLabel(newLabel);
      addFlashMessage("ラベルを作成しました", "success");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      addFlashMessage("ラベルの作成に失敗しました", "error");
    }
  };

  return (
    <>
      <aside className="label-sidebar">
        <div className="label-sidebar__header">
          <h3 className="label-sidebar__title">
            <FiTag className="label-sidebar__title-icon" />
            ラベル
          </h3>
          <button
            className="icon-btn label-sidebar__add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus />
          </button>
        </div>

        <ul className="label-sidebar__list">
          {labels.map((label) => (
            <li key={label.id} className="label-sidebar__item">
              <div className="label-sidebar__label-btn">
                <span
                  className="label-sidebar__label-color"
                  style={{ backgroundColor: label.color }}
                ></span>
                <span className="label-sidebar__label-name">{label.name}</span>
              </div>
              <button className="label-sidebar__delete-btn" onClick={() => {}}>
                <FiX />
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {isModalOpen && (
        <LabelModal
          onClose={() => setIsModalOpen(false)}
          onSave={createLabel}
        />
      )}
    </>
  );
}
