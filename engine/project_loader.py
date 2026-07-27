import json
from pathlib import Path


class ProjectLoader:
    """Loads an SGM OpenMontage project."""

    def __init__(self, project_path: str):
        self.project_path = Path(project_path)

    def _load_json(self, path: Path):
        if not path.exists():
            raise FileNotFoundError(f"Missing file: {path}")

        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def load(self):
        project = self._load_json(self.project_path)

        base = self.project_path.parent

        data = {
            "project": project,
            "brand": self._load_json(base / project["brand"]),
            "camera": self._load_json(base / project["camera"]),
            "render": self._load_json(base / project["render"]),
        }

        return data