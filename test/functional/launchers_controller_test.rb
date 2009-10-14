require 'test_helper'

class LaunchersControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:launchers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create launcher" do
    assert_difference('Launcher.count') do
      post :create, :launcher => { }
    end

    assert_redirected_to launcher_path(assigns(:launcher))
  end

  test "should show launcher" do
    get :show, :id => launchers(:one).id
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => launchers(:one).id
    assert_response :success
  end

  test "should update launcher" do
    put :update, :id => launchers(:one).id, :launcher => { }
    assert_redirected_to launcher_path(assigns(:launcher))
  end

  test "should destroy launcher" do
    assert_difference('Launcher.count', -1) do
      delete :destroy, :id => launchers(:one).id
    end

    assert_redirected_to launchers_path
  end
end
