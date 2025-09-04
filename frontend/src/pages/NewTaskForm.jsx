import React, { useEffect, useRef, useState } from "react";

export default function NewTaskForm() {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("to_do");
    const [assignees, setAssignees] = useState([]);
    const [dependencies, setDependencies] = useState([]);
    const [message, setMessage] = useState({ text: "", type: "" });

    const inputRef = useRef(null);

    const allAssignees = [
        { id: "john_doe", label: "ジョン・ドウ" },
        { id: "jane_smith", label: "ジェーン・スミス" },
        { id: "peter_jones", label: "ピーター・ジョーンズ" },
        { id: "alice_brown", label: "アリス・ブラウン" },
        { id: "bob_wilson", label: "ボブ・ウィルソン" },
        { id: "charlie_davis", label: "チャーリー・デイビス" },
    ];

    // サンプルのタスクデータ（実際のアプリではAPIから取得する想定）
    const sampleTasks = [
        { id: "task_1", name: "要件定義" },
        { id: "task_2", name: "設計" },
        { id: "task_3", name: "開発" },
        { id: "task_4", name: "テスト" },
        { id: "task_5", name: "リリース" },
    ];

    const dependencyTypes = [
        { id: "fts", label: "完了→開始 (FtS)" },
        { id: "ftf", label: "完了→完了 (FtF)" },
        { id: "sts", label: "開始→開始 (StS)" },
        { id: "stf", label: "開始→完了 (StF)" },
    ];

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleAssigneeChange = (id) => {
        setAssignees((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    };

    const handleAddDependency = () => {
        setDependencies([...dependencies, { taskId: "", type: "fts" }]);
    };

    const handleRemoveDependency = (index) => {
        setDependencies(dependencies.filter((_, i) => i !== index));
    };

    const handleDependencyChange = (index, field, value) => {
        const updatedDependencies = [...dependencies];
        updatedDependencies[index][field] = value;
        setDependencies(updatedDependencies);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!taskName.trim()) {
            showMessage("タスク名を入力してください。", "error");
            return;
        }
        if (!dueDate) {
            showMessage("期限日を選択してください。", "error");
            return;
        }
        if (assignees.length === 0) {
            showMessage("担当者を1人以上選択してください。", "error");
            return;
        }

        const task = {
            taskName,
            description,
            dueDate,
            priority,
            status,
            assignees,
            dependencies,
        };

        console.log("新しいタスクデータ:", task);

        showMessage(`タスク「${taskName}」が正常に作成されました！`, "success");

        // Reset form
        setTaskName("");
        setDescription("");
        setDueDate("");
        setPriority("medium");
        setStatus("to_do");
        setAssignees([]);
        setDependencies([]);
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: "", type: "" });
        }, 5000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-100">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    新しいタスクの作成
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Task Name */}
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            タスク名
                        </label>
                        <input
                            type="text"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg
                            transition duration-200"
                            placeholder="タスク名を入力してください"
                            required
                            ref={inputRef}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 text-lg font-semibold mb-2">
                            説明
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg
                            transition duration-200 resize-y"
                            placeholder="タスクの詳細を入力してください"
                        ></textarea>
                    </div>

                    {/* Due Date and Assignees */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">
                                期限日
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg
                                transition duration-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">
                                担当者
                            </label>
                            <div className="checkbox-container max-h-[110px] overflow-y-auto border border-gray-300 rounded-lg p-2">
                                {allAssignees.map((a) => (
                                    <div key={a.id} className="checkbox-item flex items-center py-1">
                                        <input
                                            type="checkbox"
                                            checked={assignees.includes(a.id)}
                                            onChange={() => handleAssigneeChange(a.id)}
                                            className="rounded text-blue-600"
                                            id={`assignee_${a.id}`}
                                        />
                                        <label
                                            htmlFor={`assignee_${a.id}`}
                                            className="ml-2 text-lg text-gray-700"
                                        >
                                            {a.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Priority and Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="priority" className="block text-gray-700 text-lg font-semibold mb-2">
                                優先度
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 
                                rounded-lg text-lg transition duration-200 bg-white"
                            >
                                <option value="low">低</option>
                                <option value="medium">中</option>
                                <option value="high">高</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-lg font-semibold mb-2">
                                ステータス
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 
                                rounded-lg text-lg transition duration-200 bg-white pr-8"
                            >
                                <option value="to_do">未着手</option>
                                <option value="pending">保留</option>
                                <option value="ready">準備中</option>
                                <option value="in_progress">進行中</option>
                                <option value="in_review">レビュー待ち</option>
                                <option value="testing">テスト中</option>
                            </select>
                        </div>
                    </div>

                    {/* Dependencies Section */}
                    <div className="border-t border-gray-200 pt-5">
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-gray-700 text-lg font-semibold">
                                依存関係
                            </label>
                            <button
                                type="button"
                                onClick={handleAddDependency}
                                className="bg-blue-600 text-gray-100 hover:bg-blue-700 
                                font-semibold py-2 px-3 rounded-lg text-sm cursor-pointer"
                            >
                                依存関係を追加
                                <i className="fa-solid fa-circle-plus ml-2"></i>
                            </button>
                        </div>
                        
                        {dependencies.length === 0 ? (
                            <p className="text-gray-500 text-md italic mb-4">
                                このタスクが依存する他のタスクを追加します（任意）
                            </p>
                        ) : (
                            dependencies.map((dep, index) => (
                                <div key={index} className="mb-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">依存関係 {index + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveDependency(index)}
                                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 
                                            font-bold rounded-lg cursor-pointer
                                            text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-7000"
                                        >
                                            削除
                                            <i className="fa-solid fa-trash ml-2"></i>
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                                タスク
                                            </label>
                                            <select
                                                value={dep.taskId}
                                                onChange={(e) => handleDependencyChange(index, "taskId", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                                required
                                            >
                                                <option value="">タスクを選択</option>
                                                {sampleTasks.map(task => (
                                                    <option key={task.id} value={task.id}>
                                                        {task.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                                関係タイプ
                                            </label>
                                            <select
                                                value={dep.type}
                                                onChange={(e) => handleDependencyChange(index, "type", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            >
                                                {dependencyTypes.map(type => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Create Task Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 font-extrabold text-lg text-white py-3 rounded-lg 
                        hover:bg-blue-700 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer
                        transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        タスクを作成
                    </button>
                </form>

                {/* Message Box */}
                {message.text && (
                    // <div
                    //     className={`mt-6 p-4 rounded-lg text-lg text-center ${
                    //         message.type === "success"
                    //             ? "bg-green-100 text-green-700"
                    //             : "bg-red-100 text-red-700"
                    //     }`}
                    // >
                    //     {message.text}
                    // </div>
                    alert(message.text)
                )}
            </div>
        </div>
    );
}